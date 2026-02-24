from __future__ import annotations

import pandas as pd
import streamlit as st

from components.tables import styled_editor, csv_download
from utils.scoring import calculate_score_potencial


def build_chapter_dashboard(core: dict[str, pd.DataFrame]) -> None:
    st.subheader("Capítulos")
    top_imp = core.get("top_chapter_imp", pd.DataFrame())
    if top_imp.empty:
        st.info("Sin datos de capítulos.")
        return
    years = sorted(top_imp["Anio"].dropna().astype(int).unique())
    year = st.selectbox("Año", years, index=len(years) - 1)
    chapter_labels = sorted((top_imp["Capitulo"].astype(str).str.zfill(2) + " - " + top_imp["Capitulo_Nombre"].astype(str)).unique())
    chapter = st.selectbox("Capítulo", chapter_labels)
    cap_code = chapter.split(" - ")[0]

    d = top_imp[(top_imp["Anio"].astype(int) == int(year)) & (top_imp["Capitulo"].astype(str).str.zfill(2) == cap_code)].copy()
    d["Score_Potencial"] = calculate_score_potencial(d)
    c1, c2, c3 = st.columns(3)
    c1.metric("FOB/CIF último año", f"{d['Value'].sum():,.0f}")
    c2.metric("Productos top", f"{len(d):,}")
    c3.metric("Score promedio", f"{d['Score_Potencial'].mean():.2f}")

    styled_editor(d.sort_values("Value", ascending=False), height=500)
    csv_download(d, f"chapter_{cap_code}_{year}")
