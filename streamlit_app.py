from __future__ import annotations

import numpy as np
import pandas as pd
import plotly.express as px
import streamlit as st

from streamlit_gold_repository import GoldRepository

st.set_page_config(page_title="Observatorio Ecuador–China | Lytiks", layout="wide")

BRAND = ["#0A3D62", "#1B9CFC", "#F39C12", "#16A085", "#8E44AD", "#E74C3C"]


class UI:
    @staticmethod
    def fmt_kusd(x: float) -> str:
        if pd.isna(x):
            return "—"
        return f"${x:,.0f}k"


def apply_brand_style(fig):
    fig.update_layout(template="plotly_white")
    fig.update_layout(font=dict(size=13), title_font=dict(size=16))
    return fig


def get_product_catalog(df: pd.DataFrame) -> pd.DataFrame:
    cols = ["Producto", "Producto_Nombre", "Capitulo", "Capitulo_Nombre"]
    base = df[cols].dropna(subset=["Producto"]).copy()
    base["Codigo"] = base["Producto"].astype(str).str.zfill(6)
    base["Producto"] = base["Producto_Nombre"].fillna("Producto sin nombre")
    base = base.drop_duplicates(subset=["Codigo"]).sort_values(["Producto", "Codigo"])
    return base[["Codigo", "Producto", "Capitulo", "Capitulo_Nombre"]]


def is_china_col(df: pd.DataFrame) -> pd.Series:
    if "Es_China" in df.columns:
        return df["Es_China"].fillna(False)
    return pd.Series(False, index=df.index)


def dependency_table(df_world: pd.DataFrame, value_col: str, year_a: int, year_b: int) -> pd.DataFrame:
    d = df_world[df_world["Anio"].isin([year_a, year_b])].copy()
    if d.empty:
        return pd.DataFrame()

    world = d.groupby(["Anio", "Producto"], observed=True)[value_col].sum().rename("World")
    china = d[is_china_col(d)].groupby(["Anio", "Producto"], observed=True)[value_col].sum().rename("China")
    out = pd.concat([world, china], axis=1).fillna(0).reset_index()
    out["Share"] = np.where(out["World"] > 0, out["China"] / out["World"], np.nan)

    a = out[out["Anio"] == year_a][["Producto", "Share", "China", "World"]].rename(
        columns={"Share": f"Share_{year_a}", "China": f"China_{year_a}", "World": f"World_{year_a}"}
    )
    b = out[out["Anio"] == year_b][["Producto", "Share", "China", "World"]].rename(
        columns={"Share": f"Share_{year_b}", "China": f"China_{year_b}", "World": f"World_{year_b}"}
    )
    comp = a.merge(b, on="Producto", how="outer")
    num_cols = [c for c in comp.columns if c != "Producto"]
    comp[num_cols] = comp[num_cols].fillna(0)
    comp["Delta_Share"] = comp[f"Share_{year_b}"] - comp[f"Share_{year_a}"]
    return comp


def chart_dependency_unique_names(dep: pd.DataFrame, catalog: pd.DataFrame, year_b: int, topn: int) -> pd.DataFrame:
    if dep.empty:
        return dep

    cat = catalog[["Codigo", "Producto"]].rename(columns={"Producto": "Producto_Label"})
    out = dep.merge(cat, left_on="Producto", right_on="Codigo", how="left")
    out["Producto_Label"] = out["Producto_Label"].astype("string").fillna("Producto sin nombre")

    yb_share = f"Share_{year_b}"
    yb_china = f"China_{year_b}"
    yb_world = f"World_{year_b}"
    grp = out.groupby("Producto_Label", observed=True)[[yb_china, yb_world]].sum().reset_index()
    grp[yb_share] = np.where(grp[yb_world] > 0, grp[yb_china] / grp[yb_world], np.nan)
    grp = grp.rename(columns={"Producto_Label": "Producto"})
    return grp.sort_values(yb_share, ascending=False).head(topn)


def compare_years(df: pd.DataFrame, value_col: str, year_a: int, year_b: int) -> pd.DataFrame:
    col_a = str(year_a)
    col_b = str(year_b) if year_b != year_a else f"{year_b} (comparación)"

    a = (
        df[df["Anio"] == year_a]
        .groupby(["Producto", "Producto_Nombre"], observed=True)[value_col]
        .sum()
        .rename(col_a)
    )
    b = (
        df[df["Anio"] == year_b]
        .groupby(["Producto", "Producto_Nombre"], observed=True)[value_col]
        .sum()
        .rename(col_b)
    )
    out = pd.concat([a, b], axis=1).fillna(0).reset_index()
    out = out.rename(columns={"Producto": "Codigo", "Producto_Nombre": "Producto"})
    out["Delta"] = out[col_b] - out[col_a]
    out["Crec_%"] = np.where(out[col_a] > 0, out["Delta"] / out[col_a], np.nan)
    return out.sort_values(col_b, ascending=False)


def page_ejecutivo(core: dict[str, pd.DataFrame]) -> None:
    st.subheader("Página 1 — Ejecutivo")
    yearly = core["metrics_yearly"].copy()
    if yearly.empty:
        st.info("No hay datos anuales.")
        return

    years = sorted(yearly["Anio"].astype(int).unique())
    year_kpi = st.selectbox("Año KPI", years, index=len(years) - 1)
    row = yearly[yearly["Anio"] == year_kpi].iloc[0]

    c1, c2, c3 = st.columns(3)
    c1.metric("Exportaciones a China (FOB)", UI.fmt_kusd(row["Export_FOB_CN"]))
    c2.metric("Importaciones desde China (FOB)", UI.fmt_kusd(row["Import_FOB_CN"]))
    c3.metric("Balanza comercial (FOB)", UI.fmt_kusd(row["Balanza_FOB"]))

    fig1 = px.line(
        yearly,
        x="Anio",
        y=["Export_FOB_CN", "Import_FOB_CN"],
        color_discrete_sequence=BRAND,
        title="Histórico bilateral: Exportaciones e Importaciones (FOB)",
    )
    st.plotly_chart(apply_brand_style(fig1), use_container_width=True)

    fig2 = px.line(
        yearly,
        x="Anio",
        y="Balanza_FOB",
        color_discrete_sequence=[BRAND[2]],
        title="Evolución de Balanza Comercial bilateral (FOB)",
    )
    st.plotly_chart(apply_brand_style(fig2), use_container_width=True)


def page_dependencia(core: dict[str, pd.DataFrame]) -> None:
    st.subheader("Página 2 — Dependencia China")
    exp_world = core["exp_world"].copy()
    imp_world = core["imp_world"].copy()
    catalog = get_product_catalog(pd.concat([exp_world, imp_world], ignore_index=True))

    years = sorted(set(exp_world["Anio"].astype(int).unique()).union(set(imp_world["Anio"].astype(int).unique())))
    y1, y2 = st.columns(2)
    year_a = y1.selectbox("Año inicial", years, index=max(0, len(years) - 2))
    year_b = y2.selectbox("Año final", years, index=len(years) - 1)

    exp_dep = dependency_table(exp_world, "FOB", year_a, year_b)
    imp_dep = dependency_table(imp_world, "CIF", year_a, year_b)

    exp_over = exp_dep[(exp_dep[f"Share_{year_a}"] > 0.5) | (exp_dep[f"Share_{year_b}"] > 0.5)]
    imp_over = imp_dep[(imp_dep[f"Share_{year_a}"] > 0.5) | (imp_dep[f"Share_{year_b}"] > 0.5)]

    k1, k2 = st.columns(2)
    k1.metric("Export: productos >50% dependencia", f"{len(exp_over):,}")
    k2.metric("Import: productos >50% dependencia", f"{len(imp_over):,}")

    c1, c2 = st.columns(2)
    with c1:
        st.markdown("#### Exportaciones (FOB)")
        exp_chart = chart_dependency_unique_names(exp_over, catalog, year_b, topn=15)
        fig = px.bar(
            exp_chart.sort_values(f"Share_{year_b}"),
            x=f"Share_{year_b}",
            y="Producto",
            orientation="h",
            color_discrete_sequence=[BRAND[0]],
            title=f"Top dependencia export {year_b}",
        )
        st.plotly_chart(apply_brand_style(fig), use_container_width=True)

    with c2:
        st.markdown("#### Importaciones (CIF)")
        imp_chart = chart_dependency_unique_names(imp_over, catalog, year_b, topn=15)
        fig = px.bar(
            imp_chart.sort_values(f"Share_{year_b}"),
            x=f"Share_{year_b}",
            y="Producto",
            orientation="h",
            color_discrete_sequence=[BRAND[1]],
            title=f"Top dependencia import {year_b}",
        )
        st.plotly_chart(apply_brand_style(fig), use_container_width=True)

    st.divider()
    st.markdown("#### Comparativa por búsqueda de producto (nombre o código)")
    options = [f"{r.Codigo} | {r.Producto}" for r in catalog.itertuples(index=False)]
    selected = st.selectbox("Producto", options)
    code = selected.split(" | ")[0]

    ex = exp_dep[exp_dep["Producto"].astype(str) == code]
    im = imp_dep[imp_dep["Producto"].astype(str) == code]

    c1, c2 = st.columns(2)
    if not ex.empty:
        r = ex.iloc[0]
        c1.metric(f"Export share {year_a}", f"{r[f'Share_{year_a}']*100:.1f}%")
        c1.metric(f"Export share {year_b}", f"{r[f'Share_{year_b}']*100:.1f}%")
    if not im.empty:
        r = im.iloc[0]
        c2.metric(f"Import share {year_a}", f"{r[f'Share_{year_a}']*100:.1f}%")
        c2.metric(f"Import share {year_b}", f"{r[f'Share_{year_b}']*100:.1f}%")


def page_productos(core: dict[str, pd.DataFrame]) -> None:
    st.subheader("Página 3 — Productos")
    st.caption("Izquierda: Exportaciones a China (FOB). Derecha: Importaciones desde China (CIF).")

    exp_cn = core["exp_world"][core["exp_world"]["Es_China"]].copy()
    imp_cn = core["imp_world"][core["imp_world"]["Es_China"]].copy()

    years = sorted(set(exp_cn["Anio"].astype(int).unique()).union(set(imp_cn["Anio"].astype(int).unique())))
    c1, c2 = st.columns(2)
    year_a = c1.selectbox("Año comparación 1", years, index=max(0, len(years) - 2), key="p3_a")
    year_b = c2.selectbox("Año comparación 2", years, index=len(years) - 1, key="p3_b")

    if year_a == year_b:
        st.warning("Elegiste el mismo año en ambas comparaciones; se mostrará una segunda columna de comparación con el mismo año para evitar errores de columnas duplicadas.")

    exp_cmp = compare_years(exp_cn, "FOB", year_a, year_b)
    imp_cmp = compare_years(imp_cn, "CIF", year_a, year_b)

    col_b_exp = str(year_b) if year_b != year_a else f"{year_b} (comparación)"
    col_b_imp = col_b_exp

    # KPIs premium de oportunidad
    exp_opp = exp_cmp[(exp_cmp["Delta"] > 0) & (exp_cmp["Crec_%"] > 0.25) & (exp_cmp[col_b_exp] > exp_cmp[col_b_exp].quantile(0.60))]
    imp_opp = imp_cmp[(imp_cmp["Delta"] > 0) & (imp_cmp["Crec_%"] > 0.25) & (imp_cmp[col_b_imp] > imp_cmp[col_b_imp].quantile(0.60))]

    k1, k2, k3, k4 = st.columns(4)
    k1.metric("Oportunidades exportación (premium)", f"{len(exp_opp):,}")
    k2.metric("Oportunidades importación (premium)", f"{len(imp_opp):,}")
    k3.metric("Nuevos productos export", f"{(exp_cmp[str(year_a)] == 0).sum():,}" if str(year_a) in exp_cmp.columns else "0")
    k4.metric("Nuevos productos import", f"{(imp_cmp[str(year_a)] == 0).sum():,}" if str(year_a) in imp_cmp.columns else "0")

    left, right = st.columns(2)
    with left:
        st.markdown("### Exportaciones a China (FOB)")
        left.dataframe(exp_cmp.head(30), use_container_width=True, height=460)
    with right:
        st.markdown("### Importaciones desde China (CIF)")
        right.dataframe(imp_cmp.head(30), use_container_width=True, height=460)

    st.markdown("### Radar de oportunidades (Top crecimiento)")
    gx, gy = st.columns(2)
    with gx:
        fig = px.bar(
            exp_opp.sort_values("Delta", ascending=False).head(12).sort_values("Delta"),
            x="Delta",
            y="Producto",
            orientation="h",
            color_discrete_sequence=[BRAND[3]],
            title="Export: productos con oportunidad",
        )
        st.plotly_chart(apply_brand_style(fig), use_container_width=True)
    with gy:
        fig = px.bar(
            imp_opp.sort_values("Delta", ascending=False).head(12).sort_values("Delta"),
            x="Delta",
            y="Producto",
            orientation="h",
            color_discrete_sequence=[BRAND[4]],
            title="Import: productos con oportunidad",
        )
        st.plotly_chart(apply_brand_style(fig), use_container_width=True)


def page_estacionalidad(core: dict[str, pd.DataFrame]) -> None:
    st.subheader("Página 4 — Estacionalidad")
    flow = st.radio("Flujo", ["Exportaciones", "Importaciones"], horizontal=True)
    metric = st.radio("Métrica", ["USD", "TM"], horizontal=True)

    if flow == "Exportaciones":
        base = core["exp_world"][core["exp_world"]["Es_China"]].copy()
        value_col = "FOB" if metric == "USD" else "TM"
    else:
        base = core["imp_world"][core["imp_world"]["Es_China"]].copy()
        value_col = "CIF" if metric == "USD" else "TM"

    g = base.groupby(["Mes", "Anio"], observed=True)[value_col].sum().reset_index()
    pv = g.pivot(index="Mes", columns="Anio", values=value_col).sort_index()
    st.plotly_chart(px.imshow(pv, aspect="auto", color_continuous_scale="Reds"), use_container_width=True)

    year = st.selectbox("Año treemap", sorted(base["Anio"].astype(int).unique()))
    dz = base[base["Anio"] == year]
    agg = dz.groupby(["Capitulo_Nombre", "Producto_Nombre"], observed=True)[value_col].sum().reset_index()
    agg = agg[agg[value_col] > 0]
    agg = agg.rename(columns={"Producto_Nombre": "Producto"})
    st.plotly_chart(px.treemap(agg, path=["Capitulo_Nombre", "Producto"], values=value_col), use_container_width=True)


def page_trademap(core: dict[str, pd.DataFrame]) -> None:
    st.subheader("Página 5 — TradeMap")
    tm = core["trademap"].copy()
    if tm.empty:
        st.info("No hay panel TradeMap")
        return

    # Diccionario capítulo -> nombre (desde BCE enriquecido)
    cap_ref = pd.concat(
        [
            core["exp_world"][["Capitulo", "Capitulo_Nombre"]],
            core["imp_world"][["Capitulo", "Capitulo_Nombre"]],
        ],
        ignore_index=True,
    ).dropna().drop_duplicates()
    cap_ref["Capitulo"] = cap_ref["Capitulo"].astype(str).str.zfill(2)
    cap_map = cap_ref.drop_duplicates("Capitulo").set_index("Capitulo")["Capitulo_Nombre"].to_dict()

    year = st.selectbox("Año", sorted(tm["Year"].dropna().astype(int).unique()))
    d = tm[tm["Year"].astype(int) == int(year)].copy()
    d["Capitulo"] = d["Capitulo"].astype(str).str.zfill(2)
    d["Capitulo_Label"] = d["Capitulo"].map(lambda x: f"{x} - {cap_map.get(x, f'Capítulo {x}')}")

    cap_options = sorted(d["Capitulo_Label"].unique())
    cap_sel_labels = st.multiselect("Capítulos (buscar por código o nombre)", options=cap_options, default=cap_options[:1])
    cap_sel_codes = [x.split(" - ")[0] for x in cap_sel_labels]

    countries = sorted(d["Pais"].dropna().astype(str).unique())
    countries_sel = st.multiselect("Países para comparar con Ecuador", options=countries, default=["Ecuador"])

    d = d[d["Capitulo"].isin(cap_sel_codes)] if cap_sel_codes else d
    world = d.groupby("Capitulo_Label", observed=True)["Value"].sum().rename("World")

    rows = []
    for c in countries_sel:
        ctry = d[d["Pais"].str.upper() == c.upper()].groupby("Capitulo_Label", observed=True)["Value"].sum().rename("Country")
        out = pd.concat([world, ctry], axis=1).fillna(0).reset_index()
        out["Share"] = np.where(out["World"] > 0, out["Country"] / out["World"], np.nan)
        out["Pais"] = c
        rows.append(out)
    res = pd.concat(rows, ignore_index=True) if rows else pd.DataFrame(columns=["Capitulo_Label", "World", "Country", "Share", "Pais"])

    fig = px.bar(
        res,
        x="Capitulo_Label",
        y="Share",
        color="Pais",
        barmode="group",
        color_discrete_sequence=BRAND,
        title="Dependencia por capítulo (importaciones de China)",
    )
    fig.update_xaxes(title="Capítulo")
    st.plotly_chart(apply_brand_style(fig), use_container_width=True)
    st.dataframe(res.sort_values(["Capitulo_Label", "Pais"]), use_container_width=True, height=420)


@st.cache_data(show_spinner=False)
def load_data(gold_dir: str) -> dict[str, pd.DataFrame]:
    return GoldRepository.load_core(gold_dir)


def main() -> None:
    st.sidebar.header("⚙️ Configuración")
    gold_dir = st.sidebar.text_input("Carpeta gold", value="data/gold")

    pages = {
        "📌 Ejecutivo": page_ejecutivo,
        "🧠 Dependencia China": page_dependencia,
        "📦 Productos": page_productos,
        "🧭 Estacionalidad": page_estacionalidad,
        "🌍 TradeMap": page_trademap,
    }

    page = st.sidebar.radio("Páginas", list(pages.keys()))

    st.title("Observatorio Ecuador–China | Lytiks")
    core = load_data(gold_dir)
    pages[page](core)


if __name__ == "__main__":
    main()
