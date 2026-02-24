from __future__ import annotations

import pandas as pd
import streamlit as st


def styled_editor(df: pd.DataFrame, height: int = 420) -> None:
    st.data_editor(
        df,
        use_container_width=True,
        height=height,
        hide_index=True,
        disabled=True,
    )


def csv_download(df: pd.DataFrame, name: str) -> None:
    st.download_button(
        label=f"Descargar CSV ({name})",
        data=df.to_csv(index=False).encode("utf-8"),
        file_name=f"{name}.csv",
        mime="text/csv",
    )
