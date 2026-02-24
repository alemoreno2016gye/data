from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd

from observatorio.logging_utils import get_logger


@dataclass
class DataLoader:
    logger_name: str = "observatorio.loader"

    def __post_init__(self) -> None:
        self.logger = get_logger(self.logger_name)

    def read_parquet(self, path: Path) -> pd.DataFrame:
        self.logger.info("read_parquet", extra={"extra": {"path": str(path)}})
        return pd.read_parquet(path)

    def read_excel(self, path: Path) -> pd.DataFrame:
        self.logger.info("read_excel", extra={"extra": {"path": str(path)}})
        return pd.read_excel(path)


@dataclass
class Transformer:
    logger_name: str = "observatorio.transformer"

    def __post_init__(self) -> None:
        self.logger = get_logger(self.logger_name)

    @staticmethod
    def optimize_dtypes(df: pd.DataFrame) -> pd.DataFrame:
        out = df.copy()
        for c in out.select_dtypes(include=["object"]).columns:
            nunique = out[c].nunique(dropna=False)
            if nunique < 0.35 * max(len(out), 1):
                out[c] = out[c].astype("category")
        return out

    @staticmethod
    def normalize_hs(df: pd.DataFrame) -> pd.DataFrame:
        out = df.copy()
        if "Producto" in out.columns:
            out["Producto"] = out["Producto"].astype(str).str.replace(r"\D", "", regex=True).str.zfill(6).str[:6]
        if "Capitulo" in out.columns:
            out["Capitulo"] = out["Capitulo"].astype(str).str.replace(r"\D", "", regex=True).str.zfill(2).str[:2]
        return out


@dataclass
class FeatureEngineer:
    logger_name: str = "observatorio.features"

    def __post_init__(self) -> None:
        self.logger = get_logger(self.logger_name)

    @staticmethod
    def add_logistics_metrics(df: pd.DataFrame) -> pd.DataFrame:
        out = df.copy()
        if "CIF" in out.columns and "FOB" in out.columns:
            out["Costo_Logistico"] = out["CIF"] - out["FOB"]
            out["Tasa_Logistica"] = np.where(out["FOB"] > 0, (out["CIF"] - out["FOB"]) / out["FOB"], np.nan)
        return out

    @staticmethod
    def add_price_elasticity_proxy(df: pd.DataFrame, value_col: str = "FOB") -> pd.DataFrame:
        out = df.copy()
        if value_col not in out.columns or "TM" not in out.columns:
            return out
        grouped = (
            out.groupby(["Producto_Nombre", "Anio"], observed=True)[[value_col, "TM"]]
            .sum()
            .reset_index()
            .sort_values(["Producto_Nombre", "Anio"])
        )
        grouped["dln_price"] = np.log(grouped[value_col].replace(0, np.nan)).groupby(grouped["Producto_Nombre"]).diff()
        grouped["dln_qty"] = np.log(grouped["TM"].replace(0, np.nan)).groupby(grouped["Producto_Nombre"]).diff()
        grouped["Elasticidad"] = np.where(grouped["dln_price"] != 0, grouped["dln_qty"] / grouped["dln_price"], np.nan)
        return out.merge(grouped[["Producto_Nombre", "Anio", "Elasticidad"]], on=["Producto_Nombre", "Anio"], how="left")


@dataclass
class KPIEngine:
    logger_name: str = "observatorio.kpis"
    default_group_level: str = "Producto_Nombre"

    def __post_init__(self) -> None:
        self.logger = get_logger(self.logger_name)

    @staticmethod
    def _key(df: pd.DataFrame, group_level: str) -> str:
        return group_level if group_level in df.columns else "Producto"

    def share_china(self, df: pd.DataFrame, value_col: str, group_level: str | None = None) -> pd.DataFrame:
        key = self._key(df, group_level or self.default_group_level)
        world = df.groupby(["Anio", key], observed=True)[value_col].sum().rename("world")
        china = df[df["Es_China"]].groupby(["Anio", key], observed=True)[value_col].sum().rename("china")
        out = pd.concat([world, china], axis=1).fillna(0).reset_index().rename(columns={key: "Producto_Agrupado"})
        out["share_china"] = np.where(out["world"] > 0, out["china"] / out["world"], np.nan)
        return out

    def hhi(self, df: pd.DataFrame, value_col: str, group_level: str | None = None) -> pd.DataFrame:
        key = self._key(df, group_level or self.default_group_level)
        g = df.groupby(["Anio", key, "Pais_UP"], observed=True)[value_col].sum().reset_index()
        den = g.groupby(["Anio", key], observed=True)[value_col].transform("sum")
        g["s"] = np.where(den > 0, g[value_col] / den, np.nan)
        out = g.groupby(["Anio", key], observed=True)["s"].apply(lambda x: float(np.nansum(x**2))).reset_index(name="HHI")
        return out.rename(columns={key: "Producto_Agrupado"})

    def exposure_index(self, df: pd.DataFrame, value_col: str, group_level: str | None = None) -> pd.DataFrame:
        share = self.share_china(df, value_col, group_level)
        key = "Producto_Agrupado"
        china = df[df["Es_China"]].groupby(["Anio", self._key(df, group_level or self.default_group_level)], observed=True)[value_col].sum().reset_index()
        china = china.rename(columns={self._key(df, group_level or self.default_group_level): key, value_col: "china_value"}).sort_values([key, "Anio"])
        china["yoy"] = china.groupby(key, observed=True)["china_value"].pct_change()
        vol = china.groupby(key, observed=True)["yoy"].std().reset_index(name="vol_yoy")
        out = share.groupby(key, observed=True)["share_china"].mean().reset_index().merge(vol, on=key, how="left")
        out["Exposure"] = out["share_china"] * out["vol_yoy"]
        return out


@dataclass
class ObservatorioPipeline:
    """Pipeline modular raw->cleaned->enriched->kpis preserving parquet compatibility."""

    loader: DataLoader = DataLoader()
    transformer: Transformer = Transformer()
    engineer: FeatureEngineer = FeatureEngineer()
    kpis: KPIEngine = KPIEngine()

    def validate_dictionary_match(self, df: pd.DataFrame) -> dict[str, Any]:
        total = len(df)
        matched = int(df.get("Producto_Nombre", pd.Series(dtype=str)).notna().sum()) if total else 0
        rate = (matched / total) if total else 0.0
        invalid_hs = int((df.get("Producto", pd.Series(dtype=str)).astype(str).str.len() != 6).sum()) if total else 0
        return {
            "rows": total,
            "dictionary_match_rate": rate,
            "invalid_hs6_count": invalid_hs,
        }

    def run_from_gold(self, exp_world: pd.DataFrame, imp_world: pd.DataFrame) -> dict[str, pd.DataFrame]:
        exp = self.transformer.optimize_dtypes(self.transformer.normalize_hs(exp_world))
        imp = self.transformer.optimize_dtypes(self.transformer.normalize_hs(imp_world))
        imp = self.engineer.add_logistics_metrics(imp)
        imp = self.engineer.add_price_elasticity_proxy(imp, value_col="CIF" if "CIF" in imp.columns else "FOB")

        out = {
            "share_import": self.kpis.share_china(imp, value_col="CIF" if "CIF" in imp.columns else "FOB"),
            "hhi_import": self.kpis.hhi(imp, value_col="CIF" if "CIF" in imp.columns else "FOB"),
            "exposure_import": self.kpis.exposure_index(imp, value_col="CIF" if "CIF" in imp.columns else "FOB"),
            "validated_import": pd.DataFrame([self.validate_dictionary_match(imp)]),
            "validated_export": pd.DataFrame([self.validate_dictionary_match(exp)]),
        }
        return out
