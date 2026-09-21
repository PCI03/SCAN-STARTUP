# PCI Stock v0.2.0

## Actualizar desde v0.1.0

Exporta una copia JSON. Sustituye los archivos del repositorio **PCI-Stock** por los de este ZIP, manteniendo la misma URL. No borres los datos del navegador. La base `pci-stock-inventory-v1` y el esquema 1 se mantienen: no hay que importar el inventario de nuevo. Tras el despliegue, comprueba **v0.2.0** en la cabecera. No se ha modificado ni publicado nada en CardEX.

## Diseño

Pantalla de escaneo con menos información, opciones y detalles plegados, fotografía capturada a la izquierda y referencia propuesta a la derecha. En teléfono se apilan para mantener legibilidad. La fotografía se muestra en cuanto se acepta la captura, antes de completar el reconocimiento. La entrada al stock sigue necesitando pulsar Añadir; una captura no crea unidades por sí sola.

Marca PCI en SVG con icono de carta y versión visible. Es una marca tipográfica provisional: el paquete no contenía un archivo del logo oficial. Puede sustituirse por ese original en `assets/pci-logo.svg`.

## Cámara de marco fijo

- Proporción 63:88, centrada y estable. No es una escala física de milímetros en pantalla: adapta su tamaño a la cámara y al teléfono.
- Azul: falta encuadrar. Ámbar: ajustar posición, ángulo, luz o enfoque. Verde: mantener quieta para capturar. Colores acompañados de texto.
- La búsqueda geométrica se limita al marco con un margen; no busca en todo el fondo. El contorno detectado no se dibuja ni desplaza la guía.
- Comprueba las cuatro esquinas, tamaño, centrado, verticalidad, perspectiva y detalle. Conserva normalización por perspectiva y control de calidad del motor base.
- La autocaptura requiere estabilidad durante al menos 850 ms y tres observaciones válidas; no son tres fotografías solicitadas al usuario. El OCR comienza después de la captura.
- El botón Capturar no fuerza una foto fuera de estos controles. Puedes subir una imagen si el detector no consigue bloquear la carta.
- Se solicita formato vertical en móvil. El marco se calcula sobre la imagen visible incluso si el navegador entrega vídeo horizontal con bandas; no se estira el vídeo.
- Una carta boca abajo tiene la misma geometría que una orientada correctamente. La guía pide título arriba; se conserva la comparación de orientación de la base y se añade Giro 180° para corregir la foto y reidentificar. No se afirma detectar infaliblemente esta orientación.

## Identificación

Se mantienen los índices completos, OCR, detalles locales y catálogos ES/EN/JA existentes. No se afirma haber ampliado el catálogo a todas las cartas ni se añaden datos ficticios.

Se añade un contraste final independiente entre número impreso, total de colección, idioma, nombre e imagen. Las candidatas con contradicciones se relegan frente a las compatibles. Una imagen similar no vence por sí sola a un número o idioma corroborado en conflicto. Varias referencias con los mismos datos quedan como propuestas para revisar.

Cuando el número no está corroborado y hay evidencia de idioma, se realiza una relectura focalizada del pie en ese idioma (presupuesto de reconocimiento de 15 segundos, además de carga del motor si fuera necesaria). Si ambas lecturas discrepan, la interfaz lo indica; no declara el número verificado. No se añade este paso cuando la lectura inicial ya es suficiente.

Se diferencian «Datos corroborados», «Propuesta» y «Hay discrepancias». No son porcentajes de probabilidad ni certificados. Las discrepancias exigen revisión antes de añadir. Los contrastes de la propuesta quedan asociados al movimiento; edición, acabado, condición y precios siguen sin inventarse.

La fiabilidad con fotografías reales debe medirse en una colección de prueba. Estas mejoras se han comprobado con casos controlados y pruebas de integración, no constituyen una tasa de acierto real. Comparte frontales originales de casos fallidos con número/colección esperado para calibrar umbrales sin perder cartas válidas.

## Archivos nuevos

- `assets/stock-camera.js`: guía fija, control de captura, vista de fotografía y adaptación visual.
- `assets/stock-refresh.css`: diseño v0.2.0.
- `assets/pci-logo.svg`: marca PCI provisional.
- `assets/stock-reliability.js`: contraste independiente y relectura selectiva.
- `tests/camera.spec.cjs` y `tests/reliability.spec.cjs`: nuevas pruebas.

La persistencia, exportaciones y respaldo conservan su comportamiento. La versión del esquema sigue siendo 1; la versión de aplicación es 0.2.0.
