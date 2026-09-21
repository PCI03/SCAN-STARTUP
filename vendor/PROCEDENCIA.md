# ExcelJS 4.4.0

Dependencia local de exportación XLSX. No requiere CDN durante uso de inventario.

- Proyecto y documentación oficial: https://github.com/exceljs/exceljs
- Distribución consultada: https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js
- Contraste binario: https://registry.npmjs.org/exceljs/-/exceljs-4.4.0.tgz (`package/dist/exceljs.min.js`). Los archivos coinciden byte por byte.
- SHA-256: `7e49da68588e250dbb8bba190d2caa8ab3787cc0284bda1d8b2f805c4df742c9`
- Licencia MIT: `EXCELJS-LICENSE.txt`.
- Version fijada; la exportación usa `Workbook`, `addWorksheet`, valores String explícitos, formato de texto `@` y `xlsx.writeBuffer`.
- Verificación: exportación/relectura con ExcelJS y lectura independiente con openpyxl; IDs y numeración se conservan como texto y no se generan celdas fórmula.

El paquete no modifica proveedores ni versiones de OCR de la base. Se conserva Tesseract 6.0.1 y el acceso TCGdex original. Los datos del directorio data tienen sus propias versiones, independientes de PCI Stock.
