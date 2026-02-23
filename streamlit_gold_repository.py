from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import pandas as pd
import streamlit as st


@dataclass(frozen=True)
class GoldPaths:
    root: Path

    def path(self, name: str) -> Path:
        return self.root / f"{name}.parquet"


class GoldRepository:
    """Repositorio de lectura para Streamlit (sin ETL pesado en runtime)."""

    @staticmethod
    @st.cache_data(show_spinner=False)
    def load_dataset(gold_dir: str, name: str) -> pd.DataFrame:
        return pd.read_parquet(GoldPaths(Path(gold_dir)).path(name))

    @staticmethod
    @st.cache_data(show_spinner=False)
    def load_core(gold_dir: str) -> dict[str, pd.DataFrame]:
        names = ["exp_world", "imp_world", "trademap", "metrics_yearly", "catalog"]
        return {n: pd.read_parquet(GoldPaths(Path(gold_dir)).path(n)) for n in names}

    @staticmethod
    @st.cache_data(show_spinner=False)
    def load_kpis(gold_dir: str) -> dict[str, pd.DataFrame]:
        names = [
            "kpi_share_exp",
            "kpi_share_imp",
            "kpi_hhi_exp",
            "kpi_hhi_imp",
            "kpi_vuln_exp",
            "kpi_vuln_imp",
            "top_exp_by_year",
            "top_imp_by_year",
            "vol_exp",
            "vol_imp",
            "heatmap_exp_usd",
            "heatmap_exp_tm",
            "heatmap_imp_usd",
            "heatmap_imp_tm",
            "treemap_exp",
            "treemap_imp",
            "trademap_share_ecu",
            "trademap_ranking",
        ]
        return {n: pd.read_parquet(GoldPaths(Path(gold_dir)).path(n)) for n in names}
