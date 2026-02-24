from __future__ import annotations

import numpy as np
import pandas as pd
import streamlit as st

from components.charts import quadrant_scatter
from components.tables import styled_editor


def _prep(df: pd.DataFrame, flow: str) -> pd.DataFrame:
    if df.empty:
        return df
    out = df.copy()
    if "Producto_Agrupado" not in out.columns:
        out["Producto_Agrupado"] = out.get("Producto_Nombre", out.get("Producto", "N/A"))
    val_col = "FOB" if "FOB" in out.columns else ("CIF" if "CIF" in out.columns else None)
    if val_col is None:
        return pd.DataFrame()
    out = out[["Anio", "Producto_Agrupado", val_col]].rename(columns={val_col: "Valor"})
    out["Flujo"] = flow
    return out


def build_product_dashboard(core: dict[str, pd.DataFrame]) -> None:
    st.subheader("Productos")
    exp = _prep(core.get("top_exp_by_year", pd.DataFrame()), "Export")
    imp = _prep(core.get("top_imp_by_year", pd.DataFrame()), "Import")
    d = pd.concat([exp, imp], ignore_index=True)
    if d.empty:
        st.info("Sin datos de productos.")
        return

    d = d.sort_values(["Flujo", "Producto_Agrupado", "Anio"])
    d["Valor_prev"] = d.groupby(["Flujo", "Producto_Agrupado"], observed=True)["Valor"].shift(1)
    d["YoY"] = np.where(d["Valor_prev"] > 0, (d["Valor"] - d["Valor_prev"]) / d["Valor_prev"], np.nan)

    years = sorted(d["Anio"].dropna().astype(int).unique())
    y = st.selectbox("Año", years, index=len(years) - 1)
    view = d[d["Anio"].astype(int) == int(y)].copy()

    # share dentro del flujo-año
    den = view.groupby("Flujo", observed=True)["Valor"].transform("sum")
    view["Share_Flujo"] = np.where(den > 0, view["Valor"] / den, np.nan)

    styled_editor(view[["Flujo", "Producto_Agrupado", "Valor", "YoY", "Share_Flujo"]].sort_values(["Flujo", "Valor"], ascending=[True, False]), height=460)
    quadrant_scatter(view, x="Share_Flujo", y="YoY", label="Producto_Agrupado", title="Cuadrantes estratégicos (Share vs YoY)")
