from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd

from etl_build import build_gold
from observatorio.pipeline import ObservatorioPipeline


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Runner híbrido: build_gold completo o KPIs modulares sobre gold existente")

    # modo completo (mismos argumentos que usabas)
    p.add_argument("--exports-dir", type=Path)
    p.add_argument("--imports-dir", type=Path)
    p.add_argument("--dict-path", type=Path)
    p.add_argument("--trademap-path", type=Path)

    # modo gold ya existente
    p.add_argument("--gold-dir", type=Path, default=Path("data/gold"))

    p.add_argument("--out-dir", type=Path, default=Path("data/gold"))
    p.add_argument("--force", action="store_true")
    return p.parse_args()


def has_full_sources(args: argparse.Namespace) -> bool:
    return all([
        args.exports_dir is not None,
        args.imports_dir is not None,
        args.dict_path is not None,
        args.trademap_path is not None,
    ])


def main() -> None:
    args = parse_args()

    if has_full_sources(args):
        build_gold(
            exports_dir=args.exports_dir,
            imports_dir=args.imports_dir,
            dict_path=args.dict_path,
            trademap_path=args.trademap_path,
            out_dir=args.out_dir,
            force=args.force,
        )
        return

    pipe = ObservatorioPipeline()
    exp = pd.read_parquet(args.gold_dir / "exp_world.parquet")
    imp = pd.read_parquet(args.gold_dir / "imp_world.parquet")

    outputs = pipe.run_from_gold(exp, imp)
    args.out_dir.mkdir(parents=True, exist_ok=True)
    for name, df in outputs.items():
        df.to_parquet(args.out_dir / f"{name}.parquet", index=False)


if __name__ == "__main__":
    main()
