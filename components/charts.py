from __future__ import annotations

import pandas as pd
import plotly.express as px
import streamlit as st

BRAND = ["#0A3D62", "#1B9CFC", "#F39C12", "#16A085", "#8E44AD", "#E74C3C"]


def line_with_options(df: pd.DataFrame, x: str, y: str, title: str, show_trend: bool, show_ma: bool) -> None:
    d = df.copy().sort_values(x)
    cols = [y]
    if show_ma:
        d[f"{y}_MA3"] = d[y].rolling(3, min_periods=1).mean()
        cols.append(f"{y}_MA3")
    fig = px.line(d, x=x, y=cols, title=title, color_discrete_sequence=BRAND)
    if show_trend and len(d) >= 2:
        fig2 = px.scatter(d, x=x, y=y, trendline="ols")
        for tr in fig2.data:
            if tr.name and "trend" in tr.name.lower():
                tr.name = "Tendencia"
                fig.add_trace(tr)
    fig.update_layout(template="plotly_white")
    st.plotly_chart(fig, use_container_width=True)


def quadrant_scatter(df: pd.DataFrame, x: str, y: str, label: str, title: str) -> None:
    fig = px.scatter(df, x=x, y=y, text=label, title=title, color_discrete_sequence=[BRAND[3]])
    fig.update_layout(template="plotly_white")
    st.plotly_chart(fig, use_container_width=True)
