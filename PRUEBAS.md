# Verificación de v0.2.0

Se volvieron a ejecutar las **20 pruebas de aplicación** y las **4 pruebas del motor/índices** de la primera entrega. Superadas con Chromium 133 y Playwright, incluyendo stock, recarga, dobles acciones, respaldo y exportación.

Se añadieron y superaron **5 grupos de cámara**:

1. Marco 63:88; carta centrada aceptada; desplazada, girada en el plano o ambigua rechazada.
2. Posición y tamaño del marco invariantes frente a cambios de esquinas detectadas; cambio a verde.
3. Vídeo sintético con detección/calidad controladas: estabilidad → captura automática única → normalización → cierre de cámara; ningún movimiento de inventario automático.
4. Captura manual no puede saltarse la validación del marco.
5. Mapeo de guía dentro de vídeo con bandas en ventana móvil; sin desbordamientos.

Y **4 grupos de identificación**:

1. Número, total e idioma corroborados prevalecen frente a mayor similitud de ilustración contradictoria.
2. OCR débil, ambiguo o contradictorio no se toma como evidencia independiente.
3. Ilustración sin datos impresos queda como propuesta.
4. Relectura focalizada solo cuando hace falta; coincidencia incorporada y discrepancia señalada. Las respuestas OCR de este test son controladas.

**Total: 33 grupos de pruebas superados.** Sintaxis revisada. Índices de datos idénticos a la entrega anterior. Diseño inspeccionado en 1280 × 900 y 440 × 956.

No se ha validado esta versión con cámara física ni Safari en iPhone 17 Pro Max. El vídeo sintético verifica coordinación y geometría, no calidad real del enfoque. Tampoco mide acierto de identificación en fotos reales. Las pruebas anteriores de flujo mantienen proveedores externos simulados. No se ha probado una instalación remota en GitHub Pages: se entrega el ZIP para actualizarla.

Ejecuta `npm test` para la batería completa con Node, Python y Chromium de Playwright instalados. Un Chromium local puede indicarse mediante `STOCK_CHROMIUM=/ruta/al/chromium npm test`. Las pruebas requieren Linux/macOS por sus archivos temporales en `/tmp/`.

Para probar en iPhone: actualiza el mismo repositorio PCI-Stock, confirma v0.2.0, permite cámara, prueba carta centrada/desplazada/inclinada y verifica que el marco no se mueva. Comprueba foto y propuesta; añade una unidad y recarga. Envía un frontal original y la referencia esperada para cada fallo de identificación. Si tienes el logo oficial, adjúntalo para sustituir la marca provisional.

---

## Detalle de regresión heredado de la primera entrega

# Verificación histórica — PCI Stock 0.1.0

Fecha: 21 de septiembre de 2026. Aplicación servida por HTTP en localhost. Navegador Chromium 133 headless mediante Playwright 1.62.1, ventana 440 × 956. No es Safari ni un iPhone real. La ventana móvil y capturas se revisaron visualmente; no se observaron desbordamientos horizontales ni errores JavaScript durante la batería.

## Resultado ejecutado: 20 pruebas de aplicación superadas

| Prueba | Resultado / alcance |
|---|---|
| Arranque e interfaz móvil | Sin errores JavaScript; ancho dentro de la ventana |
| Doble entrada concurrente con mismo ID | Una unidad y un movimiento |
| Dos acciones con la misma carta | Dos unidades |
| Idioma, variante, acabado y ubicación | SKU distintos; desconocido separado |
| Deshacer | Movimiento inverso, historial conservado |
| Salida superior a existencias | Rechazada; sin cambio parcial |
| Salida y ajuste con motivo | Saldos correctos; edición con revisión antigua rechazada |
| Colisión al editar | Requiere consentimiento; fusión conserva IDs, cantidades y movimientos |
| Recargar | IndexedDB real restaura datos en el mismo contexto del navegador |
| Namespace | Inventario PCI Stock propio; no abre la caché original de evaluación |
| JSON alterado / duplicado / solapamiento | Cantidad inconsistente rechazada; copia repetida no suma; solapamiento rechazado |
| CSV | BOM, delimitador, comillas, saltos de línea, acentos, japonés y neutralización de fórmulas |
| XLSX | Escritura y lectura real con ExcelJS; `001/102` como texto y cantidad numérica |
| Fallo de almacenamiento | Excepción de cuota inyectada durante escritura; rollback real de cantidad y movimiento |
| JSON disjunto | Importación correcta; metadatos de origen conservados; repetición sin alta |
| Dos pestañas | Misma acción simultánea se confirma una sola vez |
| Interfaz de alta | Doble clic no duplica; renderizar no añade; otra acción idéntica suma |
| Inventario | Búsqueda, edición de ubicación e historial desde la interfaz |
| Identificación frontal | Se completa sin reverso; consulta automática ES/EN. Proveedores/OCR simulados para probar el flujo |
| Captura/subida y cancelación | Subida de imagen activa identificación; una sola toma; resultado de trabajo cancelado descartado |

El agrupamiento de la tabla describe las 20 funciones de prueba del archivo `tests/inventory.spec.cjs`; algunas filas separan comprobaciones de una misma función. El listado exacto está en `tests/RESULTADOS.json`.

## Motor original e integridad: 4 pruebas adicionales superadas

- Índice EN completo de 19.507: búsqueda de un descriptor contra el binario completo devuelve su propia referencia entre las candidatas.
- Índice JA completo de 3.882: misma prueba independiente.
- Suplemento aniversario de 158: misma prueba independiente.
- Detector geométrico original: localiza un rectángulo sintético y devuelve cuatro esquinas.

Estas pruebas usan código real de los workers y binarios completos, no sustituciones. La recuperación del descriptor de una referencia contra sí misma comprueba el índice y el algoritmo, **no mide precisión con fotografías**. Se verificaron los hashes SHA-256 de todos los archivos de `data/` contra el ZIP original; sin diferencias. Se comprobó la sintaxis de scripts, workers y módulos.

El CSV también se leyó con el parser CSV de Python y el XLSX con openpyxl, de forma independiente: 20 columnas por fila; número impreso de texto; cantidades numéricas; ninguna celda de fórmula. Se verificó la copia local de ExcelJS contra el paquete npm de la misma versión (véase `vendor/PROCEDENCIA.md`).

## Pendiente de prueba real

No se ha probado cámara física, autofocus, permisos, iluminación o descarga/importación en Safari del iPhone 17 Pro Max. Tampoco se ha ejecutado una identificación completa con OCR y TCGdex en vivo sobre una foto real del usuario. Las pruebas de flujo sustituyen las respuestas externas por fixtures deterministas: no justifican afirmar una tasa de reconocimiento ni precisión de idioma/edición.

El intento inicial de instalar los navegadores gestionados por Playwright falló por tiempo de descarga; se utilizó un binario Chromium independiente para ejecutar las pruebas. No se ejecutaron pruebas WebKit. La compatibilidad Safari queda explícitamente pendiente.

## Protocolo en iPhone

1. Publica en el repositorio NUEVO siguiendo README. Abre la URL HTTPS y confirma v0.1.0.
2. Permite la cámara. Escanea solo un frontal con las cuatro esquinas y comprueba que captura sin esperar a OCR ni pedir otras dos tomas.
3. Revisa la propuesta, numeración, colección e idioma. Si no coincide, selecciona una alternativa o corrige el dato. No confirmes variantes sin evidencia.
4. Añade una unidad; vuelve a escanear otro ejemplar idéntico: deben ser dos. Una doble pulsación no debe ser dos movimientos.
5. Prueba otro idioma o variante declarada: debe ser una fila separada.
6. Deshaz la última entrada; registra una salida y prueba una salida excesiva: debe rechazarse.
7. Recarga Safari y comprueba los saldos. Exporta XLSX, CSV y JSON; verifica número impreso, japonés, notas y cantidades.
8. Importa la copia: no debe duplicar tu stock existente. Para probar restauración en otro navegador, importa en uno vacío; comprueba saldo e historial y vuelve a importar el mismo archivo: debe avisar que ya se importó.
9. Prueba una edición que coincida con otro SKU. Debe exigir fusión explícita y conservar el historial.

Para una regresión real de reconocimiento se necesitan frontales originales sin compresión de una carta ES, una EN y una JA, con nombre/colección/número esperado. Para un fallo de cámara, una captura de la pantalla y el texto de estado permiten distinguir permiso, detección y enfoque.

## Reproducir pruebas de código

Requisitos: Node, Python 3 y Playwright. Desde esta carpeta:

```sh
npm install
npx playwright install chromium
npm test
```

El test levanta y cierra su servidor en localhost:8766 y usa un contexto de navegador nuevo; no utiliza tu stock real. Los servicios externos se bloquean en las pruebas de interfaz. Los archivos temporales de validación se escriben en `/tmp/` (suite preparada para Linux/macOS). En Linux se puede indicar un Chromium ya instalado con `STOCK_CHROMIUM=/ruta/al/chromium npm test`. `STOCK_BROWSER=webkit` está previsto, pero no fue ejecutado en esta entrega. GitHub Pages no necesita instalar ninguna de estas herramientas.
