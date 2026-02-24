from __future__ import annotations

import argparse
import json
from pathlib import Path


EXPECTED_OUTPUTS = [
    "exp_world.parquet",
    "imp_world.parquet",
    "trademap.parquet",
    "metrics_yearly.parquet",
    "catalog.parquet",
]


def main() -> None:
    p = argparse.ArgumentParser(description="Static healthcheck for observatorio repository")
    p.add_argument("--gold-dir", type=Path, default=Path("data/gold"))
    args = p.parse_args()

    manifest = args.gold_dir / "manifest.json"
    if not manifest.exists():
        print(f"WARN: missing manifest at {manifest}")
        return

    data = json.loads(manifest.read_text(encoding="utf-8"))
    outputs = set(data.get("outputs", []))
    missing = [x for x in EXPECTED_OUTPUTS if x not in outputs]
    if missing:
        raise SystemExit(f"ERROR: manifest missing expected outputs: {missing}")

    print("OK: manifest.json present with expected core outputs")


if __name__ == "__main__":
    main()
