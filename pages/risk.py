from __future__ import annotations

import pandas as pd
import streamlit as st

from components.tables import styled_editor


def render(core: dict[str, pd.DataFrame], kpis: dict[str, pd.DataFrame]) -> None:
    st.subheader("Riesgo")
    vuln = kpis.get("kpi_vuln_imp", pd.DataFrame())
    hhi = kpis.get("kpi_hhi_imp", pd.DataFrame())
    if vuln.empty:
        st.info("Sin KPIs de riesgo.")
        return
    st.markdown("Top exposición estratégica")
    styled_editor(vuln.sort_values("vulnerability", ascending=False).head(30), height=420)
    if not hhi.empty:
        st.markdown("Concentración (HHI)")
        styled_editor(hhi.sort_values("HHI", ascending=False).head(30), height=320)
