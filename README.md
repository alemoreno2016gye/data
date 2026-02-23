# data

MVP+ de desacople ETL/Streamlit para el observatorio Ecuador–China.

## Qué se añadió

- `etl_build.py`: job batch que procesa BCE/TradeMap y materializa datasets gold en Parquet.
- `streamlit_gold_repository.py`: repositorio de lectura para Streamlit usando `@st.cache_data` sobre Parquet.
- `streamlit_app.py`: app Streamlit consumiendo gold parquet con navegación vertical en sidebar.

## Ejecución del ETL batch

```bash
python etl_build.py \
  --exports-dir "<ruta_exportaciones_xlsx>" \
  --imports-dir "<ruta_importaciones_xlsx>" \
  --dict-path "<ruta_diccionario_hs.xlsx>" \
  --trademap-path "<ruta_panel_trademap.xlsx>" \
  --out-dir "data/gold"
```

## Ejecución de la app Streamlit

```bash
streamlit run streamlit_app.py
```

En la barra lateral puedes apuntar a la carpeta `gold` (por defecto `data/gold`).

### Ajustes UX incorporados en la app

- Página Ejecutivo: series de tiempo separadas en 2 gráficos (Export/Import y Balanza).
- Navegación de páginas en barra vertical izquierda (sidebar).
- Página Dependencia:
  - KPI central de dependencia (>50%) para export (FOB) e import (CIF).
  - Gráficos evitando duplicados por nombre de producto (se consolida por nombre).
  - Comparativa por búsqueda de producto (código o nombre), sin depender de tabla para seleccionar.
- Página Productos: comparativas mostrando columnas con años seleccionados (ya no etiquetas genéricas A/B).
- Página TradeMap: filtros por capítulos (producto) y selección múltiple de países para comparar con Ecuador.

## Salidas gold (core)

- `data/gold/exp_world.parquet`
- `data/gold/imp_world.parquet`
- `data/gold/trademap.parquet`
- `data/gold/metrics_yearly.parquet`
- `data/gold/catalog.parquet`
- `data/gold/manifest.json`

## Salidas gold (KPIs/tablas del observatorio)

- Dependencia: `kpi_share_exp.parquet`, `kpi_share_imp.parquet`
- Concentración HHI: `kpi_hhi_exp.parquet`, `kpi_hhi_imp.parquet`
- Vulnerabilidad: `kpi_vuln_exp.parquet`, `kpi_vuln_imp.parquet`
- Productos top bilateral por año: `top_exp_by_year.parquet`, `top_imp_by_year.parquet`
- Volatilidad YoY bilateral: `vol_exp.parquet`, `vol_imp.parquet`
- Estacionalidad (mes×año): `heatmap_exp_usd.parquet`, `heatmap_exp_tm.parquet`, `heatmap_imp_usd.parquet`, `heatmap_imp_tm.parquet`
- Treemap bilateral por año: `treemap_exp.parquet`, `treemap_imp.parquet`
- TradeMap: `trademap_share_ecu.parquet`, `trademap_ranking.parquet`

## Cobertura lógica vs app original

La build batch considera explícitamente la lógica de:

- Ejecutivo bilateral FOB (export/import/balanza)
- Dependencia por share China (mundo como denominador)
- HHI por producto-año
- Vulnerabilidad (`share * volatilidad YoY`)
- Productos top bilateral por año
- Volatilidad YoY bilateral
- Estacionalidad mensual (USD/TM) y treemap
- Módulo TradeMap (share y ranking)

## Regla solicitada para subpartidas incompletas

Si un HS6 no existe en el diccionario (incluyendo `None`, vacío, `0`/`000000`), el nombre de producto usa fallback:

1. HS6
2. HS4
3. HS2
4. Etiqueta genérica (`Capítulo XX (sin detalle HS6)` / `Producto sin clasificar`)

Esto evita `None` en nombres de producto.


## Nuevas capacidades estratégicas (v2)

- Consolidación principal por nombre (`Producto_Nombre`) en KPIs clave (share/HHI/vulnerabilidad/top/volatilidad) con soporte de `group_level` en ETL.
- Nueva página Streamlit **📈 Dinámica Temporal** para BCE con filtros de capítulo, país, flujo y métrica, serie mensual+MA3, serie anual y YoY.
- TradeMap reforzado con búsqueda de capítulos por código y nombre (etiqueta `XX - Nombre`) e histórica de market share por país.
- Nuevos parquet: `top_chapter_exp.parquet`, `top_chapter_imp.parquet`, `china_structural_break.parquet`.
