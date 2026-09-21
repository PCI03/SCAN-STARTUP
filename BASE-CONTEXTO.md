# Base técnica y decisiones

## Dos productos independientes

- Professional Card Inspection / CardEX: escaneo, identificación y evaluación. Permanece en el chat original.
- PCI Stock (nombre provisional): escaneo, identificación e inventario. Nuevo chat y repositorio.

La entrega no es una bifurcación desplegada ni una app de stock terminada. Es una copia del código para empezar esa bifurcación sin perder el reconocimiento existente.

## Base

`base/index.html` es v1.14.0: HTML/CSS/JS monolítico con workers en scripts text/plain. La arquitectura creció con extensiones; varias funciones se redefinen al final. Inspeccionar la última definición antes de modificar; no reconstruir el escáner desde cero.

Motor geométrico y captura: `CameraCapture`, `CaptureRules`, `DetectionClient`. Una toma frontal aceptada, corrección de perspectiva y control de detalle; v1.12 anula la ráfaga de `Holo19.collect/finalize`. La tolerancia al brillo no certifica que sea holo.

Reconocimiento: `pairedIdentify`, `VisualIndex18`, `JapaneseIndex19`, `Local18`, `PokemonDatabase`, `scanEvidence18`. Actualmente `pairedIdentify` exige frontal/reverso y varios puntos del flujo llaman identificación solo si existen ambas fotos: cambiar todos esos puntos coherentemente para el modo stock. Conservar cancelación y protección frente a resultados de una foto antigua.

Idioma: `resolveLanguage21`, `latinLanguage22`, `prioritizeLanguage22`. Comparación de título/pie EN/JA, palabras ES/EN y códigos impresos. La cobertura visual ES no es independiente: usa OCR/catálogo ES y candidatos relacionados con EN. Debe verificarse la ficha nativa, no traducir una referencia inglesa ni heredar su acabado.

Datos: TCGdex y Tesseract 6.0.1 por CDN. La base usa `https://api.tcgdex.net/v2` y las imágenes del proveedor. Consultar documentación vigente si se cambian dependencias/proveedores. No se ha auditado aquí licencia para un despliegue comercial; conservar procedencia y revisar condiciones antes de distribución comercial.

`Anniversary20`: combina el suplemento con EN por ID sin reemplazar el índice completo. El esquema del suplemento sigue siendo 1.10.0; no cambiar su versión de datos al cambiar versión de aplicación. No implica incluir todas las promos/idiomas del aniversario.

## Instantánea incluida

- EN: 19.507 referencias visuales, copia de trabajo descargada previamente del despliegue del usuario.
- JA: 3.882 referencias visuales, cobertura parcial.
- Detalles locales precomputados: subconjunto antiguo de 206 cartas; es una caché auxiliar, NO el índice EN completo.
- Aniversario: 158 referencias visuales EN; catálogo suplementario con 188 fichas por idioma EN/ES, incluyendo 30 sin imagen. La mezcla deduplica IDs.

MANIFEST.json recoge las cantidades leídas y hashes. No se ha vuelto a descargar el repositorio actual; si hay una versión posterior, compararla antes de reemplazar datos. No sustituir `visual-index` por el antiguo índice de 206 cartas.

## Evaluación existente

`Condition24` aplica heurísticas de brillo/discontinuidades, no un modelo entrenado. `reportMarkup23` exporta un informe HTML de identificación. El grading anterior es simulado. No usar ninguno como condición comercial automática. Para stock, ocultar el flujo de evaluación y crear su propia exportación.

## Evidencia de funcionamiento y límites

El usuario informó de unas 50 cartas inglesas normales reconocidas en una versión previa. No es una tasa de precisión validada de v1.14. Persisten riesgos por reflejos, idioma, ilustraciones compartidas, edición y referencias ausentes. Hay pruebas de código de captura/cancelación, ES/EN, referencias EN/JA y señales sintéticas; no hay validación física automática del iPhone.

## Diseño mínimo del inventario

Separar módulos de captura, reconocimiento, inventario, movimientos, persistencia y exportación. No guardar inventario dentro de la caché de referencias. Operaciones idempotentes con ID de entrada; transacción de producto+movimiento. Eliminar o corregir una fila no debe borrar silenciosamente el historial. Revisión de candidatos y confirmación de entrada son acciones distintas.

Preparar un esquema versionado con productos/SKU, lotes o ubicaciones, movimientos y sesión de escaneo. No fusionar simplemente por nombre o ilustración. ID proveedor, TCG, idioma y variante deben quedar explícitos, y los desconocidos deben poder revisarse.

Primero CSV + respaldo JSON; XLSX si procede, sin fingir formato Excel nativo. La exportación no es persistencia ni sincronización. Respaldos y almacenamiento local deben distinguirse en la interfaz.
