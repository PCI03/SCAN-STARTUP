# PCI Stock 0.2.0 — primera fase

**Novedades y actualización desde v0.1.0:** consulta `CAMBIOS-v0.2.0.md`. Mantén la misma URL y los datos del navegador para conservar tu inventario.

Aplicación independiente para escanear Pokémon y gestionar existencias de una tienda. Derivada del `base/index.html` v1.14.0 entregado por el usuario. El reconocimiento visual, detección geométrica, normalización, controles de captura, OCR y referencias originales se reutilizan. No se ha escrito ni publicado nada en `garciatalavera2003-code/CardEX`.

## Probar en un repositorio NUEVO de GitHub Pages

1. Descomprime este ZIP. Crea un repositorio nuevo, por ejemplo **PCI-Stock**. No uses CardEX.
2. Sube el contenido de esta carpeta a la raíz del repositorio: **index.html**, **assets/**, **vendor/** y **data/**. Puedes subir también la documentación y tests. No subas el ZIP como único archivo ni dejes `index.html` dentro de `base/`.
3. En el repositorio nuevo: **Settings → Pages → Deploy from a branch → main → /(root) → Save**.
4. Espera a que finalice el despliegue. Abre **Visit site**. La dirección tendrá la forma `https://TU-USUARIO.github.io/PCI-Stock/`.
5. En Safari del iPhone abre esa URL HTTPS y permite la cámara. Comprueba que la cabecera dice **v0.2.0**. La vista del HTML en github.com no ejecuta la aplicación. Una pestaña privada sirve para diagnosticar caché, pero no para conservar el stock.

No se necesita compilación, servidor propio, cuenta de la app ni clave API. ExcelJS va incluido. La primera identificación requiere internet para OCR, catálogo e imágenes de TCGdex. Cámara y OCR no suben tus fotografías a TCGdex. Los recursos externos conservan las dependencias de la base.

Documentación oficial del origen de publicación: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Para probar en ordenador con Python instalado: `python3 -m http.server 8000` desde esta carpeta; abre `http://localhost:8000`. Abrir `index.html` por doble clic (`file://`) no reproduce cámara, workers ni carga de índices. En otro dispositivo, una IP local por HTTP no sustituye HTTPS.

## Ciclo de trabajo

1. **Escanear** abre la cámara. El marco permanece fijo, con proporción 63:88. Azul: encuadrar; ámbar: ajustar; verde: mantener. La captura automática requiere centrado, verticalidad, perspectiva razonable, detalle y estabilidad; el botón Capturar tampoco permite saltarse estas comprobaciones. El OCR se ejecuta después. Se acepta una sola toma frontal, no una ráfaga de tres ni un reverso obligatorio.
2. **Subir imagen** ejecuta detección/normalización y búsqueda con el mismo motor. JPG, PNG y WebP, máximo 15 MB. El reverso se puede aportar opcionalmente en la mesa de escaneo.
3. Revisa la **propuesta**: imagen, colección, número e ID del proveedor. Las alternativas y evidencias están desplegables. Puedes corregir todos los datos antes de añadir. El idioma físico queda vacío si no hay evidencia suficiente, aunque la referencia tenga idioma.
4. Pulsa **Añadir al stock** (cantidad inicial 1). Esa pulsación confirma el alta. Tras guardarse, queda lista una nueva carta. No se añaden unidades al capturar, identificar o repintar la pantalla. Dos ejemplares iguales en acciones distintas suman unidades; repetir la misma acción no.
5. **Inventario** ofrece búsqueda, filtro por idioma/existencias, edición, altas manuales de unidades de SKU existente, salidas, ajustes y movimientos. Salidas y ajustes requieren motivo. No se admiten negativos ni fracciones. **Deshacer última entrada** registra un movimiento inverso, sin borrar historial. Si ya no quedan suficientes unidades, se rechaza.
6. **Exportar** descarga XLSX, CSV o una copia JSON. El stock pertenece solo a este navegador/origen. No se comparte entre móvil y ordenador.

No se asigna condición comercial automáticamente; no hay notas de grading, precios estimados ni selector obligatorio de holo/aniversario. El motor experimental de desgaste no se ejecuta en PCI Stock. El nombre, número y referencia son propuestas, no certificados de edición, acabado o autenticidad.

## Identidad del SKU y edición

Clave: **TCG + proveedor + ID referencia + idioma + variante/edición + acabado + condición declarada + ubicación**. Se mantiene además un UUID interno independiente de la clave. Desconocido se representa con cadena vacía; nunca se rellena con una variante supuesta. Espacios externos se recortan y texto se normaliza en NFC; las mayúsculas de los campos libres se distinguen. Emplea códigos de idioma `es`, `en`, `ja` para aprovechar los filtros.

Editar un campo de clave mantiene el UUID. Si la nueva clave coincide con otra fila, la operación se detiene y ofrece **fusionar explícitamente**. Se conserva la fila original con cantidad cero y `mergedInto`, el destino recibe sus unidades y se registran dos movimientos vinculados. El historial visible del destino incluye las filas fusionadas. Los datos comerciales del destino prevalecen; el historial conserva los valores de origen y los cambios solicitados. No hay borrado destructivo de filas.

Al añadir a un SKU existente, su ficha comercial actual no se sobrescribe. Los datos declarados de cada entrada se conservan en `entryMetadata` del movimiento; cambia la ficha con **Editar** si quieres actualizar coste/precio/notas. Los importes se guardan como texto decimal exacto con punto, no se promedian ni calculan valoraciones. Si indicas importe, debes indicar moneda ISO de tres letras. Precios y condición vacíos siguen desconocidos.

## Exportaciones

- **XLSX real**: archivo OpenXML creado con **ExcelJS 4.4.0**, incluido en `vendor/`. IDs, numeración (`001/102`, `TG01/TG30`), textos, importes y fechas son celdas de texto explícitas. Cantidad es numérica. Incluye una segunda hoja de movimientos. No crea fórmulas a partir del texto.
- **CSV**: UTF-8 con BOM, delimitador `;`, finales de registro CRLF; todos los campos entre comillas y comillas internas duplicadas. Conserva acentos, japonés y saltos de línea. El texto potencialmente interpretable como fórmula se prefija con apóstrofo. CSV no tiene tipos: importa en Excel desde **Datos → Desde texto/CSV**, indicando Texto para IDs/números; si quieres abrir directamente sin conversión, usa XLSX. No se disfraza CSV como XLSX.
- **JSON esquema 1**: productos (incluidas filas fusionadas), movimientos completos, metadatos y registro de importaciones. **No incluye fotografías, archivos de imágenes, capturas temporales ni caché de catálogo**. Sí conserva las URLs de imágenes de referencia. Es la copia restaurable completa del inventario.

## Importaciones y conservación

Antes de importar se valida formato, esquema, cantidades, campos, IDs, referencias entre registros, fusiones y consistencia de saldos con los movimientos. Verás fecha, filas, unidades y movimientos antes de confirmar.

**Combinar** solo acepta IDs y SKU disjuntos. Las copias con solapamientos se rechazan para no sumar dos veces el mismo stock. Una copia ya importada se detecta por ID y huella SHA-256 del contenido; no añade unidades. Esta fase no reconcilia inventarios de varios dispositivos.

**Sustituir** es una restauración explícita del estado de la copia: requiere descargar una copia previa y escribir `SUSTITUIR`. Sustituye también historial y metadatos. Comprueba que el archivo previo se descargó realmente antes de proceder. Cierra otras pestañas durante una restauración. No hay sustituciones automáticas.

IndexedDB tiene base propia `pci-stock-inventory-v1`, esquema 1; catálogo separado `pci-stock-catalog-v1`. Productos y movimientos se guardan en la misma transacción. Una interrupción/fallo antes del commit no registra un movimiento parcial. Los fallos se muestran; el alta no se da por guardada hasta completar la transacción. Ediciones y recuentos detectan cambios simultáneos de la fila. Borrar datos del sitio, cambiar dominio/perfil o la retirada de almacenamiento por el navegador puede perder acceso al stock: descarga copias periódicas. Solicitar persistencia no reemplaza el respaldo.

## Cobertura y pruebas

Los binarios e índices entregados se conservan completos, byte por byte: EN 19.507 referencias, JA 3.882, suplemento aniversario 158. El índice local antiguo de 206 es solo auxiliar, no sustituye el índice EN. No se afirma cobertura de todas las cartas o idiomas. ES usa OCR y catálogo nativo, asociado a candidatos EN; JA tiene su propio índice parcial. Una ilustración compartida puede producir varias referencias plausibles.

Consulta **PRUEBAS.md** para resultados y límites. No se ha validado físicamente esta versión en iPhone 17 Pro Max. Para mejorar reconocimiento con casos reales, envía un frontal original de cada carta que falle, el número/colección esperado y el resultado propuesto. Un caso ES, uno EN y uno JA permitirán empezar una regresión reproducible.

## Estructura y siguientes fases

- `index.html`: base de captura y reconocimiento adaptada; workers integrados.
- `assets/stock-store.js`: persistencia, SKU, movimientos, respaldo e importación.
- `assets/stock-ui.js`: interfaz y adaptación al reconocimiento original.
- `assets/stock-export.js`: CSV/XLSX.
- `assets/stock.css`: variante visual Stock.
- `data/`: instantánea completa original.
- `vendor/`: ExcelJS fijado, licencia y procedencia.
- `tests/`: pruebas reproducibles. `package.json` solo se necesita para tests, no para GitHub Pages.

`PCIStockAdapters` es el punto de integración para reconocedores de otros TCG. Solo Pokémon está conectado. La persistencia y exportación están separadas para futuras ampliaciones. No se implementan cuentas, sincronización multiusuario, TPV, pedidos ni mercados.

Las transacciones de esta fase leen los registros para validar colisiones e historial. Adecuadas para probar el ciclo; antes de inventarios muy grandes deben añadirse índices y paginación y medir rendimiento en iPhone. No se afirma capacidad de producción a gran escala.
