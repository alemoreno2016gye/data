from __future__ import annotations

import streamlit as st

from streamlit_gold_repository import GoldRepository
from pages import overview, chapters, products, risk, logistics


st.set_page_config(page_title="Observatorio Ecuador–China | Modular", layout="wide")


@st.cache_data(show_spinner=False)
def load_all(gold_dir: str):
    core = GoldRepository.load_core(gold_dir)
    kpis = GoldRepository.load_kpis(gold_dir)
    return core, kpis


def main() -> None:
    st.sidebar.header("⚙️ Configuración")
    gold_dir = st.sidebar.text_input("Carpeta gold", value="data/gold")

    core, kpis = load_all(gold_dir)

    tabs = st.tabs(["Overview", "Capítulos", "Productos", "Riesgo", "Logística"])
    with tabs[0]:
        overview.render(core)
    with tabs[1]:
        chapters.build_chapter_dashboard(core | kpis)
    with tabs[2]:
        products.build_product_dashboard(core | kpis)
    with tabs[3]:
        risk.render(core, kpis)
    with tabs[4]:
        logistics.render(core)


if __name__ == "__main__":
    main()
