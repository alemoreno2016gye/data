from __future__ import annotations

import pandas as pd
import streamlit as st
import plotly.express as px

from components.tables import styled_editor


def render(core: dict[str, pd.DataFrame]) -> None:
    st.subheader("Logística")
    imp = core.get("imp_world", pd.DataFrame()).copy()
    if imp.empty or "CIF" not in imp.columns or "FOB" not in imp.columns:
        st.info("Sin datos suficientes de logística (CIF/FOB).")
        return
    imp["Costo_Logistico"] = imp["CIF"] - imp["FOB"]
    imp["Tasa_Logistica"] = (imp["CIF"] - imp["FOB"]) / imp["FOB"].replace(0, pd.NA)
    by_year = imp.groupby("Anio", observed=True)[["Costo_Logistico", "Tasa_Logistica"]].mean().reset_index()
    st.plotly_chart(px.line(by_year, x="Anio", y="Tasa_Logistica", title="Tasa logística promedio"), use_container_width=True)
    styled_editor(imp[["Anio", "Producto_Nombre", "Pais", "CIF", "FOB", "Costo_Logistico", "Tasa_Logistica"]].head(300), height=420)
