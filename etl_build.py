from __future__ import annotations

import argparse
import hashlib
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple

import numpy as np
import pandas as pd

CHINA_ALIASES = {
    "CHINA",
    "CHINA  ",
    "CHN",
    "CN",
    "REPUBLICA POPULAR CHINA",
    "REPÚBLICA POPULAR CHINA",
    "CHINA (CONTINENTAL)",
    "CHINA CONTINENTAL",
}


class TextUtils:
    @staticmethod
    def normalize_colname(x: object) -> str:
        if x is None:
            return ""
        s = str(x).replace("\xa0", " ").strip()
        return re.sub(r"\s+", " ", s)

    @staticmethod
    def to_num(series: pd.Series) -> pd.Series:
        s = series.astype(str).str.replace("\xa0", " ", regex=False).str.strip()
        s = s.str.replace(",", "", regex=False)
        return pd.to_numeric(s, errors="coerce")

    @staticmethod
    def is_china(value: object) -> bool:
        s = str(value or "").replace("\xa0", " ").strip().upper()
        if not s:
            return False
        return s in CHINA_ALIASES or s.startswith("CHN") or s.startswith("CHINA")

    @staticmethod
    def clean_digits(value: object) -> str:
        return re.sub(r"\D", "", str(value or ""))


class DateUtils:
    @staticmethod
    def extract_year_month(periodo: object) -> Tuple[Optional[int], Optional[int]]:
        m = re.search(r"(\d{4})\s*/\s*(\d{2})", str(periodo))
        if not m:
            return None, None
        return int(m.group(1)), int(m.group(2))


class BCEExcelReader:
    @staticmethod
    def find_header_row(raw: pd.DataFrame, required_tokens: List[str], search_rows: int = 80) -> Optional[int]:
        for i in range(min(len(raw), search_rows)):
            row_join = " | ".join(raw.iloc[i].astype(str).tolist()).lower()
            if all(tok.lower() in row_join for tok in required_tokens):
                return i
        return None

    @staticmethod
    def read_one(path: Path, kind: str) -> pd.DataFrame:
        try:
            df = pd.read_excel(path, header=6)
            df.columns = [TextUtils.normalize_colname(c) for c in df.columns]
            return df
        except Exception:
            raw = pd.read_excel(path, header=None)
            tokens = ["Período", "Código", "Subpartida", "FOB" if kind == "exp" else "CIF"]
            hrow = BCEExcelReader.find_header_row(raw, tokens)
            if hrow is None:
                df = pd.read_excel(path, header=5)
                df.columns = [TextUtils.normalize_colname(c) for c in df.columns]
                return df
            header_vals = raw.iloc[hrow].tolist()
            df = raw.iloc[hrow + 1 :].copy()
            df.columns = [TextUtils.normalize_colname(x) for x in header_vals]
            df = df.loc[:, [c for c in df.columns if c and "unnamed" not in c.lower()]]
            return df.dropna(how="all")


class BCETransformer:
    @staticmethod
    def standardize(df: pd.DataFrame, kind: str) -> pd.DataFrame:
        colmap = {}
        for c in df.columns:
            cc = TextUtils.normalize_colname(c).lower()
            if cc in ("período", "periodo"):
                colmap[c] = "Periodo"
            elif "código subpartida" in cc or "codigo subpartida" in cc:
                colmap[c] = "Codigo_Subpartida"
            elif "país destino" in cc or "pais destino" in cc or "país origen" in cc or "pais origen" in cc:
                colmap[c] = "Pais"
            elif "tm (peso neto)" in cc or cc == "tm" or "peso neto" in cc:
                colmap[c] = "TM"
            elif cc == "fob":
                colmap[c] = "FOB"
            elif cc == "cif":
                colmap[c] = "CIF"

        out = df.rename(columns=colmap).copy()
        out = out.loc[:, ~out.columns.duplicated()].copy()

        for c in ["TM", "FOB", "CIF"]:
            if c in out.columns:
                out[c] = TextUtils.to_num(out[c])

        if "Periodo" in out.columns:
            out = out[out["Periodo"].astype(str).str.len() > 3]
        if "Codigo_Subpartida" in out.columns:
            out = out[out["Codigo_Subpartida"].notna()]

        ym = out["Periodo"].apply(DateUtils.extract_year_month) if "Periodo" in out.columns else []
        out["Anio"] = pd.Series([x[0] for x in ym], index=out.index, dtype="float")
        out["Mes"] = pd.Series([x[1] for x in ym], index=out.index, dtype="float")
        out["Fecha"] = pd.to_datetime(
            out["Anio"].astype("Int64").astype(str) + "-" + out["Mes"].astype("Int64").astype(str) + "-01",
            errors="coerce",
        )

        code = out.get("Codigo_Subpartida", pd.Series("", index=out.index)).astype(str)
        clean = code.str.replace(r"\D", "", regex=True)
        clean = clean.replace({"": np.nan})
        out["HS10"] = clean.fillna("0000000000").str.zfill(10)
        out["Producto"] = out["HS10"].str[:6]
        out["HS4"] = out["HS10"].str[:4]
        out["Capitulo"] = out["HS10"].str[:2]

        out["Flujo"] = "Exportaciones" if kind == "exp" else "Importaciones"
        out["Pais"] = out.get("Pais", "").astype(str).str.strip()
        out["Pais_UP"] = out["Pais"].str.upper()
        out["Es_China"] = out["Pais_UP"].isin(CHINA_ALIASES) | out["Pais_UP"].str.startswith(("CHN", "CHINA"))

        if "TM" in out.columns and "FOB" in out.columns:
            out["Precio_Ton_FOB"] = out["FOB"] / out["TM"].replace(0, np.nan)
        if "TM" in out.columns and "CIF" in out.columns:
            out["Precio_Ton_CIF"] = out["CIF"] / out["TM"].replace(0, np.nan)

        out = out.dropna(subset=["Fecha", "Anio", "Mes"]).copy()
        out["Anio"] = out["Anio"].astype(int)
        out["Mes"] = out["Mes"].astype(int)
        return out


@dataclass(frozen=True)
class HSDictionary:
    hs6_to_name: Dict[str, str]
    hs4_to_name: Dict[str, str]
    hs2_to_name: Dict[str, str]

    @staticmethod
    def load(path: Path) -> "HSDictionary":
        d = pd.read_excel(path)
        d.columns = [TextUtils.normalize_colname(c) for c in d.columns]

        desc_col = "descripción" if "descripción" in d.columns else "descripcion"
        if desc_col not in d.columns:
            raise ValueError("Diccionario requiere columna descripción/descripcion")

        d["HS_Code_Ajustado"] = pd.to_numeric(d.get("HS_Code_Ajustado"), errors="coerce")
        d["cap"] = pd.to_numeric(d.get("cap"), errors="coerce")

        hs_raw = d["HS_Code_Ajustado"].fillna(-1).astype(int).astype(str).replace("-1", np.nan)
        hs_raw = hs_raw.astype("string").str.replace(r"\D", "", regex=True)
        d["HS6"] = hs_raw.str.zfill(6)
        d["HS4"] = d["HS6"].str[:4]
        d["HS2"] = d["HS6"].str[:2]

        hs6_map = d.dropna(subset=["HS6", desc_col]).drop_duplicates("HS6").set_index("HS6")[desc_col].to_dict()
        hs4_map = d.dropna(subset=["HS4", desc_col]).drop_duplicates("HS4").set_index("HS4")[desc_col].to_dict()

        cap_df = d.dropna(subset=["cap", desc_col]).drop_duplicates("cap").copy()
        cap_df["HS2"] = cap_df["cap"].astype(int).astype(str).str.zfill(2)
        hs2_map = cap_df.set_index("HS2")[desc_col].to_dict()

        return HSDictionary(hs6_to_name=hs6_map, hs4_to_name=hs4_map, hs2_to_name=hs2_map)

    def resolve_producto_name(self, hs6: object, hs4: object, hs2: object) -> str:
        """
        Regla robusta solicitada por negocio:
        - Si HS6 no existe/no mapea (incluye None, '', 0, 000000), usar fallback HS2.
        - Orden final: HS6 -> HS4 -> HS2 -> etiqueta genérica por capítulo/código.
        """
        hs6s = TextUtils.clean_digits(hs6).zfill(6)[:6]
        hs4s = TextUtils.clean_digits(hs4).zfill(4)[:4]
        hs2s = TextUtils.clean_digits(hs2).zfill(2)[:2]

        hs6_invalid = hs6s in {"", "000000"}
        if not hs6_invalid and hs6s in self.hs6_to_name:
            return str(self.hs6_to_name[hs6s])
        if hs4s and hs4s != "0000" and hs4s in self.hs4_to_name:
            return str(self.hs4_to_name[hs4s])
        if hs2s and hs2s != "00" and hs2s in self.hs2_to_name:
            return str(self.hs2_to_name[hs2s])

        if hs2s and hs2s != "00":
            return f"Capítulo {hs2s} (sin detalle HS6)"
        return hs6s if hs6s and hs6s != "000000" else "Producto sin clasificar"

    def resolve_capitulo_name(self, hs2: object) -> str:
        hs2s = TextUtils.clean_digits(hs2).zfill(2)[:2]
        if hs2s in self.hs2_to_name:
            return str(self.hs2_to_name[hs2s])
        return f"Capítulo {hs2s}"


def enrich_names(df: pd.DataFrame, hs: HSDictionary) -> pd.DataFrame:
    if df.empty:
        return df
    out = df.copy()
    out["Capitulo"] = out["Capitulo"].astype(str).str.zfill(2)
    out["HS4"] = out["HS4"].astype(str).str.zfill(4)
    out["Producto"] = out["Producto"].astype(str).str.zfill(6)

    out["Capitulo_Nombre"] = out["Capitulo"].map(hs.resolve_capitulo_name)
    out["Producto_Nombre"] = [
        hs.resolve_producto_name(hs6=h6, hs4=h4, hs2=h2)
        for h6, h4, h2 in zip(out["Producto"], out["HS4"], out["Capitulo"])
    ]

    for c in ["Pais_UP", "Capitulo", "Producto"]:
        out[c] = out[c].astype("category")
    return out


class KPIBuilder:
    """Pre-agregaciones de KPIs del observatorio para consumo rápido en Streamlit."""

    @staticmethod
    def bilateral_yearly(exp_world: pd.DataFrame, imp_world: pd.DataFrame) -> pd.DataFrame:
        exp_cn = exp_world[exp_world["Es_China"]] if not exp_world.empty else pd.DataFrame()
        imp_cn = imp_world[imp_world["Es_China"]] if not imp_world.empty else pd.DataFrame()
        exp_y = exp_cn.groupby("Anio", observed=True)["FOB"].sum().rename("Export_FOB_CN") if not exp_cn.empty else pd.Series(dtype=float)
        imp_y = imp_cn.groupby("Anio", observed=True)["FOB"].sum().rename("Import_FOB_CN") if not imp_cn.empty else pd.Series(dtype=float)
        out = pd.concat([exp_y, imp_y], axis=1).fillna(0).reset_index()
        if not out.empty:
            out["Balanza_FOB"] = out["Export_FOB_CN"] - out["Import_FOB_CN"]
        return out

    @staticmethod
    def share_china_by_year_product(df_world: pd.DataFrame, value_col: str) -> pd.DataFrame:
        if df_world.empty or value_col not in df_world.columns:
            return pd.DataFrame(columns=["Anio", "Producto", "world_value", "china_value", "world_partner_count", "share"])

        world = df_world.groupby(["Anio", "Producto"], observed=True)[value_col].sum().rename("world_value")
        china = (
            df_world[df_world["Es_China"]]
            .groupby(["Anio", "Producto"], observed=True)[value_col]
            .sum()
            .rename("china_value")
        )
        partner_count = df_world.groupby(["Anio", "Producto"], observed=True)["Pais_UP"].nunique().rename("world_partner_count")
        out = pd.concat([world, china, partner_count], axis=1).fillna(0).reset_index()
        out["share_raw"] = np.where(out["world_value"] > 0, out["china_value"] / out["world_value"], np.nan)
        out["share"] = np.where((out["world_value"] > 0) & (out["world_partner_count"] > 1), out["share_raw"], np.nan)
        return out.drop(columns=["share_raw"])

    @staticmethod
    def hhi_partners_by_year_product(df_world: pd.DataFrame, value_col: str) -> pd.DataFrame:
        if df_world.empty or value_col not in df_world.columns:
            return pd.DataFrame(columns=["Anio", "Producto", "HHI"])
        g = df_world.groupby(["Anio", "Producto", "Pais_UP"], observed=True)[value_col].sum().reset_index()
        tot = g.groupby(["Anio", "Producto"], observed=True)[value_col].transform("sum")
        g["s"] = np.where(tot > 0, g[value_col] / tot, np.nan)
        return g.groupby(["Anio", "Producto"], observed=True)["s"].apply(lambda x: float(np.nansum(x**2))).rename("HHI").reset_index()

    @staticmethod
    def vulnerability_index(df_world: pd.DataFrame, value_col_world: str, value_col_china: str, years_window: int = 8) -> pd.DataFrame:
        if df_world.empty or value_col_world not in df_world.columns or value_col_china not in df_world.columns:
            return pd.DataFrame(columns=["Producto", "AnioMax", "share", "vol_yoy", "vulnerability"])

        share_tbl = KPIBuilder.share_china_by_year_product(df_world, value_col_world)
        share_avg = share_tbl.groupby("Producto", observed=True)["share"].mean(numeric_only=True).rename("share").reset_index()

        d_ch = df_world[df_world["Es_China"]].copy()
        annual = d_ch.groupby(["Producto", "Anio"], observed=True)[value_col_china].sum().reset_index().sort_values(["Producto", "Anio"])
        annual["yoy"] = annual.groupby("Producto", observed=True)[value_col_china].pct_change()

        max_year = int(df_world["Anio"].max())
        min_win = max_year - years_window + 1
        win = annual[(annual["Anio"] >= min_win) & (annual["Anio"] <= max_year)]
        vol = win.groupby("Producto", observed=True)["yoy"].std().rename("vol_yoy").reset_index()

        out = share_avg.merge(vol, on="Producto", how="left")
        out["AnioMax"] = max_year
        out["vulnerability"] = out["share"] * out["vol_yoy"]
        return out

    @staticmethod
    def top_products_bilateral_all_years(df_cn: pd.DataFrame, value_col: str, topn: int = 30) -> pd.DataFrame:
        if df_cn.empty or value_col not in df_cn.columns:
            return pd.DataFrame(columns=["Anio", "Producto", "Producto_Nombre", value_col])
        base = (
            df_cn.groupby(["Anio", "Producto", "Producto_Nombre"], observed=True, dropna=False)[value_col]
            .sum()
            .reset_index()
        )
        return base.sort_values(["Anio", value_col], ascending=[True, False]).groupby("Anio", observed=True).head(topn).reset_index(drop=True)

    @staticmethod
    def yoy_volatility_bilateral(df_cn: pd.DataFrame, value_col: str) -> pd.DataFrame:
        if df_cn.empty or value_col not in df_cn.columns:
            return pd.DataFrame(columns=["Producto", "Producto_Nombre", "Volatilidad_YoY"])
        annual = df_cn.groupby(["Producto", "Producto_Nombre", "Anio"], observed=True)[value_col].sum().reset_index()
        annual = annual.sort_values(["Producto", "Anio"])
        annual["yoy"] = annual.groupby("Producto", observed=True)[value_col].pct_change()
        return (
            annual.groupby(["Producto", "Producto_Nombre"], observed=True)["yoy"]
            .std()
            .rename("Volatilidad_YoY")
            .dropna()
            .reset_index()
        )

    @staticmethod
    def heatmap_month_year(df_cn: pd.DataFrame, value_col: str, flow: str) -> pd.DataFrame:
        if df_cn.empty or value_col not in df_cn.columns:
            return pd.DataFrame(columns=["Mes", "Anio", "Value", "Flujo", "Metrica"])
        g = df_cn.groupby(["Mes", "Anio"], observed=True)[value_col].sum().reset_index().rename(columns={value_col: "Value"})
        g["Flujo"] = flow
        g["Metrica"] = value_col
        return g

    @staticmethod
    def treemap_by_year(df_cn: pd.DataFrame, value_col: str, flow: str) -> pd.DataFrame:
        if df_cn.empty or value_col not in df_cn.columns:
            return pd.DataFrame(columns=["Anio", "Capitulo_Nombre", "Producto_Nombre", "Value", "Flujo", "Metrica"])
        g = (
            df_cn.groupby(["Anio", "Capitulo_Nombre", "Producto_Nombre"], observed=True, dropna=False)[value_col]
            .sum()
            .reset_index()
            .rename(columns={value_col: "Value"})
        )
        g = g[g["Value"] > 0]
        g["Flujo"] = flow
        g["Metrica"] = value_col
        return g

    @staticmethod
    def trademap_share_by_country(trademap: pd.DataFrame, country: str) -> pd.DataFrame:
        if trademap.empty:
            return pd.DataFrame(columns=["Year", "Capitulo", "World", "Country", "Share", "Pais_Comparado"])
        world = trademap.groupby(["Year", "Capitulo"], observed=True)["Value"].sum().rename("World")
        ctry = (
            trademap[trademap["Pais"].str.upper().eq(country.upper())]
            .groupby(["Year", "Capitulo"], observed=True)["Value"]
            .sum()
            .rename("Country")
        )
        out = pd.concat([world, ctry], axis=1).fillna(0).reset_index()
        out["Share"] = np.where(out["World"] > 0, out["Country"] / out["World"], np.nan)
        out["Pais_Comparado"] = country
        return out

    @staticmethod
    def trademap_competitor_ranking(trademap: pd.DataFrame, topn: int = 15) -> pd.DataFrame:
        if trademap.empty:
            return pd.DataFrame(columns=["Year", "Capitulo", "Pais", "Value", "Rank"])
        g = trademap.groupby(["Year", "Capitulo", "Pais"], observed=True)["Value"].sum().reset_index()
        g = g.sort_values(["Year", "Capitulo", "Value"], ascending=[True, True, False])
        g["Rank"] = g.groupby(["Year", "Capitulo"], observed=True).cumcount() + 1
        return g[g["Rank"] <= topn].copy()


def list_excels(folder: Path) -> List[Path]:
    if not folder.exists() or not folder.is_dir():
        return []
    return sorted(folder.glob("*.xlsx"))


def fingerprint(paths: Iterable[Path]) -> str:
    h = hashlib.sha256()
    for p in sorted(paths):
        st = p.stat()
        h.update(str(p).encode())
        h.update(str(st.st_size).encode())
        h.update(str(st.st_mtime_ns).encode())
    return h.hexdigest()


def read_bce_folder(folder: Path, kind: str) -> pd.DataFrame:
    files = list_excels(folder)
    if not files:
        return pd.DataFrame()
    frames: List[pd.DataFrame] = []
    for f in files:
        base = BCEExcelReader.read_one(f, kind=kind)
        frames.append(BCETransformer.standardize(base, kind=kind))
    return pd.concat(frames, ignore_index=True)


def build_gold(exports_dir: Path, imports_dir: Path, dict_path: Path, trademap_path: Path, out_dir: Path, force: bool) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    manifest_path = out_dir / "manifest.json"

    source_files = list(list_excels(exports_dir)) + list(list_excels(imports_dir)) + [dict_path, trademap_path]
    new_fp = fingerprint(source_files)

    if manifest_path.exists() and not force:
        old = json.loads(manifest_path.read_text(encoding="utf-8"))
        if old.get("fingerprint") == new_fp:
            print("No hay cambios en fuentes. Omitiendo rebuild (usa --force para regenerar).")
            return

    hs_dict = HSDictionary.load(dict_path)

    exp_world = enrich_names(read_bce_folder(exports_dir, "exp"), hs_dict)
    imp_world = enrich_names(read_bce_folder(imports_dir, "imp"), hs_dict)

    trademap = pd.read_excel(trademap_path)
    trademap.columns = [TextUtils.normalize_colname(c) for c in trademap.columns]
    trademap["Capitulo"] = trademap["producto"].astype(str).str[:2]
    trademap["Year"] = pd.to_numeric(trademap["year"], errors="coerce").astype("Int64")
    trademap["Value"] = pd.to_numeric(trademap["value"], errors="coerce")
    trademap["Pais"] = trademap["pais"].astype(str)
    trademap = trademap.dropna(subset=["Capitulo", "Year"])

    # Bilateral bases
    exp_cn = exp_world[exp_world["Es_China"]].copy() if not exp_world.empty else pd.DataFrame()
    imp_cn = imp_world[imp_world["Es_China"]].copy() if not imp_world.empty else pd.DataFrame()

    # KPIs / tablas preagregadas del observatorio
    metrics_yearly = KPIBuilder.bilateral_yearly(exp_world, imp_world)
    kpi_share_exp = KPIBuilder.share_china_by_year_product(exp_world, "FOB")
    kpi_share_imp = KPIBuilder.share_china_by_year_product(imp_world, "CIF")
    kpi_hhi_exp = KPIBuilder.hhi_partners_by_year_product(exp_world, "FOB")
    kpi_hhi_imp = KPIBuilder.hhi_partners_by_year_product(imp_world, "CIF")
    kpi_vuln_exp = KPIBuilder.vulnerability_index(exp_world, value_col_world="FOB", value_col_china="FOB", years_window=8)
    kpi_vuln_imp = KPIBuilder.vulnerability_index(imp_world, value_col_world="CIF", value_col_china="CIF", years_window=8)
    top_exp_by_year = KPIBuilder.top_products_bilateral_all_years(exp_cn, "FOB", topn=30)
    top_imp_by_year = KPIBuilder.top_products_bilateral_all_years(imp_cn, "CIF", topn=30)
    vol_exp = KPIBuilder.yoy_volatility_bilateral(exp_cn, "FOB")
    vol_imp = KPIBuilder.yoy_volatility_bilateral(imp_cn, "CIF")
    heatmap_exp_usd = KPIBuilder.heatmap_month_year(exp_cn, "FOB", flow="Exportaciones")
    heatmap_exp_tm = KPIBuilder.heatmap_month_year(exp_cn, "TM", flow="Exportaciones")
    heatmap_imp_usd = KPIBuilder.heatmap_month_year(imp_cn, "CIF", flow="Importaciones")
    heatmap_imp_tm = KPIBuilder.heatmap_month_year(imp_cn, "TM", flow="Importaciones")
    treemap_exp = KPIBuilder.treemap_by_year(exp_cn, "FOB", flow="Exportaciones")
    treemap_imp = KPIBuilder.treemap_by_year(imp_cn, "CIF", flow="Importaciones")
    trademap_share_ecu = KPIBuilder.trademap_share_by_country(trademap, country="Ecuador")
    trademap_ranking = KPIBuilder.trademap_competitor_ranking(trademap, topn=15)

    exp_world.to_parquet(out_dir / "exp_world.parquet", index=False)
    imp_world.to_parquet(out_dir / "imp_world.parquet", index=False)
    trademap.to_parquet(out_dir / "trademap.parquet", index=False)
    metrics_yearly.to_parquet(out_dir / "metrics_yearly.parquet", index=False)
    kpi_share_exp.to_parquet(out_dir / "kpi_share_exp.parquet", index=False)
    kpi_share_imp.to_parquet(out_dir / "kpi_share_imp.parquet", index=False)
    kpi_hhi_exp.to_parquet(out_dir / "kpi_hhi_exp.parquet", index=False)
    kpi_hhi_imp.to_parquet(out_dir / "kpi_hhi_imp.parquet", index=False)
    kpi_vuln_exp.to_parquet(out_dir / "kpi_vuln_exp.parquet", index=False)
    kpi_vuln_imp.to_parquet(out_dir / "kpi_vuln_imp.parquet", index=False)
    top_exp_by_year.to_parquet(out_dir / "top_exp_by_year.parquet", index=False)
    top_imp_by_year.to_parquet(out_dir / "top_imp_by_year.parquet", index=False)
    vol_exp.to_parquet(out_dir / "vol_exp.parquet", index=False)
    vol_imp.to_parquet(out_dir / "vol_imp.parquet", index=False)
    heatmap_exp_usd.to_parquet(out_dir / "heatmap_exp_usd.parquet", index=False)
    heatmap_exp_tm.to_parquet(out_dir / "heatmap_exp_tm.parquet", index=False)
    heatmap_imp_usd.to_parquet(out_dir / "heatmap_imp_usd.parquet", index=False)
    heatmap_imp_tm.to_parquet(out_dir / "heatmap_imp_tm.parquet", index=False)
    treemap_exp.to_parquet(out_dir / "treemap_exp.parquet", index=False)
    treemap_imp.to_parquet(out_dir / "treemap_imp.parquet", index=False)
    trademap_share_ecu.to_parquet(out_dir / "trademap_share_ecu.parquet", index=False)
    trademap_ranking.to_parquet(out_dir / "trademap_ranking.parquet", index=False)

    catalog = pd.DataFrame(
        [{"HS6": k, "Producto_Nombre": v} for k, v in hs_dict.hs6_to_name.items()]
    )
    catalog.to_parquet(out_dir / "catalog.parquet", index=False)

    manifest = {
        "fingerprint": new_fp,
        "sources": [str(p) for p in source_files],
        "outputs": [
            "exp_world.parquet",
            "imp_world.parquet",
            "trademap.parquet",
            "metrics_yearly.parquet",
            "kpi_share_exp.parquet",
            "kpi_share_imp.parquet",
            "kpi_hhi_exp.parquet",
            "kpi_hhi_imp.parquet",
            "kpi_vuln_exp.parquet",
            "kpi_vuln_imp.parquet",
            "top_exp_by_year.parquet",
            "top_imp_by_year.parquet",
            "vol_exp.parquet",
            "vol_imp.parquet",
            "heatmap_exp_usd.parquet",
            "heatmap_exp_tm.parquet",
            "heatmap_imp_usd.parquet",
            "heatmap_imp_tm.parquet",
            "treemap_exp.parquet",
            "treemap_imp.parquet",
            "trademap_share_ecu.parquet",
            "trademap_ranking.parquet",
            "catalog.parquet",
        ],
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Gold dataset generado en: {out_dir}")


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="MVP ETL desacoplado para Streamlit (gold parquet)")
    p.add_argument("--exports-dir", type=Path, required=True)
    p.add_argument("--imports-dir", type=Path, required=True)
    p.add_argument("--dict-path", type=Path, required=True)
    p.add_argument("--trademap-path", type=Path, required=True)
    p.add_argument("--out-dir", type=Path, default=Path("data/gold"))
    p.add_argument("--force", action="store_true")
    return p.parse_args()


if __name__ == "__main__":
    args = parse_args()
    build_gold(
        exports_dir=args.exports_dir,
        imports_dir=args.imports_dir,
        dict_path=args.dict_path,
        trademap_path=args.trademap_path,
        out_dir=args.out_dir,
        force=args.force,
    )
