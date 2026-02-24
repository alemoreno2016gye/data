from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd

from observatorio.pipeline import ObservatorioPipeline


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Run modular observatorio pipeline from existing gold core parquet")
    p.add_argument("--gold-dir", type=Path, default=Path("data/gold"))
    p.add_argument("--out-dir", type=Path, default=Path("data/gold"))
    return p.parse_args()


def main() -> None:
    args = parse_args()
    pipe = ObservatorioPipeline()

    exp = pd.read_parquet(args.gold_dir / "exp_world.parquet")
    imp = pd.read_parquet(args.gold_dir / "imp_world.parquet")

    outputs = pipe.run_from_gold(exp, imp)
    args.out_dir.mkdir(parents=True, exist_ok=True)
    for name, df in outputs.items():
        df.to_parquet(args.out_dir / f"{name}.parquet", index=False)


if __name__ == "__main__":
    main()
