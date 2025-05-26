// controllers/stock.controller.js

const db = require('../services/db');

// Obtener stock actual de productos activos
exports.obtenerStock = async (req, res) => {
  try {
    const [stock] = await db.execute(`
      SELECT p.codigo_producto, p.descripcion, s.stock_fisico, s.stock_comprometido
      FROM producto p
      JOIN stock s ON p.id_producto = s.id_producto
      WHERE p.estado_registro = 'A'
    `);

    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el stock' });
  }
};

// Registrar compra de mercadería (ingreso a inventario)
exports.registrarCompra = async (req, res) => {
  const {
    codigo_transaccion, // ejemplo: 'CM'
    id_producto,
    unidad_venta,
    cantidad,
    fecha_transaccion = new Date()
  } = req.body;

  try {
    // Insertar movimiento
    await db.execute(`
      INSERT INTO movimiento_inventario (codigo_transaccion, numero_transaccion, fecha_transaccion, signo, id_producto, unidad_venta, cantidad, estado_registro)
      VALUES (?, (SELECT IFNULL(MAX(numero_transaccion), 0)+1 FROM movimiento_inventario WHERE codigo_transaccion = ?), ?, '+', ?, ?, ?, 'A')
    `, [codigo_transaccion, codigo_transaccion, fecha_transaccion, id_producto, unidad_venta, cantidad]);

    // Actualizar stock físico
    await db.execute(`
      UPDATE stock SET stock_fisico = stock_fisico + ?
      WHERE id_producto = ?
    `, [cantidad, id_producto]);

    res.status(201).json({ message: 'Compra registrada y stock actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar compra' });
  }
};
