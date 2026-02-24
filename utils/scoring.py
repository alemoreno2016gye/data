from __future__ import annotations

import numpy as np
import pandas as pd


def _minmax(s: pd.Series) -> pd.Series:
    s = pd.to_numeric(s, errors="coerce")
    mn, mx = s.min(), s.max()
    if pd.isna(mn) or pd.isna(mx) or mx == mn:
        return pd.Series(np.zeros(len(s)), index=s.index)
    return (s - mn) / (mx - mn)


def calculate_score_potencial(df: pd.DataFrame) -> pd.Series:
    cagr = _minmax(df.get("CAGR_5Y", pd.Series(index=df.index, dtype=float)))
    elast = _minmax(df.get("Elasticidad", pd.Series(index=df.index, dtype=float)).abs())
    vol = _minmax(df.get("Volatilidad", pd.Series(index=df.index, dtype=float)))
    logistic = _minmax(df.get("Tasa_Logistica", pd.Series(index=df.index, dtype=float)))
    # Higher CAGR/elasticity good, lower volatility/logistic better
    return 0.35 * cagr + 0.25 * elast + 0.20 * (1 - vol) + 0.20 * (1 - logistic)
