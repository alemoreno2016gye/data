from __future__ import annotations

import sys
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from utils.scoring import calculate_score_potencial


def test_score_potencial_range() -> None:
    df = pd.DataFrame(
        {
            "CAGR_5Y": [0.1, 0.2, 0.0],
            "Elasticidad": [0.5, -0.2, 0.1],
            "Volatilidad": [0.1, 0.3, 0.2],
            "Tasa_Logistica": [0.2, 0.1, 0.4],
        }
    )
    s = calculate_score_potencial(df)
    assert len(s) == 3
    assert (s >= 0).all() and (s <= 1).all()
