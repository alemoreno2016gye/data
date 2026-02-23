# Revisión técnica: ETL consumible en Streamlit (Observatorio Ecuador–China)

## Diagnóstico rápido

Tu app está bien estructurada por capas (`Reader` / `Transformer` / `Services`), pero hoy **Streamlit está funcionando como motor ETL completo** en cada sesión/ejecución lógica. Aunque usas `@st.cache_data`, persisten cuellos de botella que explican la sensación de “calcular todo desde cero”.

## Principales flaqueos detectados

1. **Acoplamiento ETL + UI en un solo runtime**
   - La app hace lectura de *muchos* Excel, estandarización, enriquecimiento y cálculo analítico dentro del script de Streamlit.
   - Esto mezcla responsabilidades: cada interacción depende de la estabilidad del pipeline de carga.

2. **Lectura Excel masiva en tiempo de app**
   - `load_bce_folder` recorre todos los `.xlsx`, detecta encabezados y transforma cada archivo antes de concatenar.
   - Excel es costoso I/O + parsing; escalar años/archivos degradará de forma no lineal.

3. **Caché vulnerable a invalidaciones frecuentes**
   - `st.cache_data` ayuda, pero si cambian rutas, parámetros o código hash, se invalida.
   - El botón “Recalcular” limpia toda la caché y obliga a recomputar el universo completo.

4. **Repetición de agregaciones pesadas por interacción**
   - En tabs se recalculan múltiples `groupby` similares (shares, HHI, vulnerability, mapeos de nombre por `value_counts`).
   - Varias transformaciones deberían materializarse una sola vez (o por año/rango), no por widget.

5. **Filtro bilateral China con `apply` fila a fila**
   - Usar `df["Pais_UP"].apply(TextUtils.is_china)` repetidamente penaliza rendimiento.
   - Conviene construir una columna booleana `Es_China` una vez en ETL.

6. **Riesgo de dependencia del entorno local**
   - Paths absolutos Windows (`C:\Users\...`) afectan portabilidad/despliegue.
   - En Streamlit Cloud o Docker esto suele romperse.

---

## Opción de mejora recomendada (1 opción, alto impacto):
## **Materializar un “Gold dataset” incremental (Parquet) fuera de Streamlit y consumirlo en modo lectura**

### Idea
Separar el pipeline en dos fases:

- **Fase A (batch ETL programado)**: lee Excel BCE/TradeMap, limpia, enriquece y guarda tablas analíticas en Parquet (o DuckDB).
- **Fase B (Streamlit)**: solo carga Parquet ya curado y renderiza visualizaciones.

Con esto, Streamlit deja de ser el lugar donde “se cocina” todo.

### ¿Por qué esta opción?
- Reduce drásticamente tiempo de arranque.
- Hace el comportamiento más estable en producción.
- Facilita incrementalidad (procesar solo archivos nuevos/modificados).
- Permite escalar a más años/productos sin castigar interacción del usuario.

---

## Diseño propuesto (simple y aplicable)

### 1) Crear un job ETL offline
Ejemplo de artefactos `data/gold/`:

- `exp_world.parquet`
- `imp_world.parquet`
- `trademap.parquet`
- `catalog.parquet` (catálogos HS / nombres)
- `metrics_yearly.parquet` (KPIs preagregados)

### 2) Agregar fingerprint de fuentes
Guardar un `manifest.json` con:
- ruta del archivo,
- tamaño,
- `mtime`,
- hash opcional.

Si el fingerprint no cambia, no recomputar.

### 3) Precalcular columnas derivadas de alto uso
En ETL dejar listas columnas como:
- `Es_China` (bool),
- `Anio`, `Mes`, `Fecha`,
- `Producto_Nombre`, `Capitulo_Nombre`,
- agregados anuales base por `Producto` y `Pais_UP`.

### 4) Streamlit solo consulta
En la app:
- reemplazar lectura Excel por `pd.read_parquet(...)`;
- mantener `@st.cache_data` pero ahora sobre tablas ya compactas;
- filtros de widgets trabajan sobre data optimizada.

---

## Micro-optimizaciones adicionales (sin cambiar arquitectura)

1. Reemplazar `apply(TextUtils.is_china)` por máscara vectorizada precomputada (`Es_China`).
2. Convertir columnas de baja cardinalidad (`Pais_UP`, `Capitulo`, `Producto`) a `category`.
3. Evitar repetir `groupby(...).agg(lambda x: x.value_counts().index[0])` en cada tab; materializar mapas de nombre una vez.
4. Guardar resultados de KPIs costosos por combinación de parámetros clave (ej. rango años + métrica).

---

## Impacto esperado

- **Arranque de app**: de minutos/decenas de segundos a segundos.
- **Interacción entre tabs**: más fluida, menos recalculo pesado.
- **Confiabilidad en despliegue**: mayor (paths y ETL desacoplados).
- **Mantenibilidad**: mejor separación de responsabilidades (datos vs visualización).

---

## Siguiente paso sugerido

Implementar primero un **MVP de desacople**:

1. Script `etl_build.py` que genere `exp_world.parquet`, `imp_world.parquet`, `trademap.parquet`.
2. Ajustar Streamlit para leer esos tres Parquet en lugar de Excel.
3. Medir tiempo antes/después (arranque y cambio de tab).

Si quieres, en un siguiente paso te puedo pasar una plantilla concreta de `etl_build.py` + adaptación mínima del bloque `DataRepository` para que el cambio sea casi plug-and-play.
