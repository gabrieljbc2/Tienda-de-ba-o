const fs = require("fs");
const PDFDocument = require("pdfkit");

function crearPDF(orden_compra) {
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(__dirname + "/Compra_PineAppleSea_Respuesta.pdf");
  doc.pipe(stream);

  // Logo y título
  doc.image(__dirname + "/img/logo/logo.png", 25, -4);
  doc.moveDown();
  doc.fontSize(16).text("Resumen de Compra", { align: "center" });
  doc.moveDown();

  // Detalles de la compra
  doc.fontSize(12).text("Detalles de la Compra:", { underline: true });
  for (const [key, value] of Object.entries(orden_compra)) {
    if (key !== "orden_productos") {
      doc.fontSize(10).text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`);
      doc.moveDown();
    }
  }

  // Productos comprados
  doc.moveDown();
  doc.fontSize(12).text("Productos Comprados:", { underline: true });
  let subtotalSinImpuestos = 0;
  let totalImpuestos = 0;
  const productos = JSON.parse(orden_compra.orden_productos);
  productos.forEach((producto, index) => {
    const cantidad = parseFloat(producto.cantidad);
    if (cantidad > 0) { // Verificar si la cantidad es mayor que 0
      const precio = parseFloat(producto.precio);
      const impuestoProducto = precio * 0.13;
      const precioSinImpuestos = precio - impuestoProducto;
      subtotalSinImpuestos += precioSinImpuestos * cantidad;
      totalImpuestos += impuestoProducto * cantidad;

      doc.moveDown();
      doc.fontSize(10).text(`Nombre: ${producto.nombre}`);
      doc.fontSize(10).text(`Precio unitario (sin impuestos): ₡ ${precioSinImpuestos.toFixed(2)}`);
      doc.fontSize(10).text(`Impuesto (13%): ₡ ${impuestoProducto.toFixed(2)}`);
      doc.fontSize(10).text(`Cantidad: ${cantidad}`);
    }
  });

  // Total de la compra
  doc.moveDown();
  doc.fontSize(12).text("Total de la Compra:", { underline: true });
  doc.moveDown();
  doc.fontSize(10).text(`Subtotal (sin impuestos): ₡ ${subtotalSinImpuestos.toFixed(2)}`);
  doc.fontSize(10).text(`Total de impuestos (13%): ₡ ${totalImpuestos.toFixed(2)}`);
  doc.fontSize(10).text(`Total (con impuestos): ₡ ${(subtotalSinImpuestos + totalImpuestos).toFixed(2)}`);

  doc.end();
}

module.exports = crearPDF;
