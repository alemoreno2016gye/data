from __future__ import annotations

import streamlit as st
import pandas as pd
import plotly.express as px


def render(core: dict[str, pd.DataFrame]) -> None:
    st.subheader("Overview")
    yearly = core.get("metrics_yearly", pd.DataFrame())
    if yearly.empty:
        st.info("Sin datos de overview.")
        return
    st.plotly_chart(px.line(yearly, x="Anio", y=["Export_FOB_CN", "Import_FOB_CN"]), use_container_width=True)
    st.plotly_chart(px.line(yearly, x="Anio", y="Balanza_FOB"), use_container_width=True)
