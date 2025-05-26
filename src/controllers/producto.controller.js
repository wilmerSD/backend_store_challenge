// controllers/producto.controller.js

const db = require('../services/db');

exports.obtenerProductos = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM producto WHERE estado_registro = "A"');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

exports.crearProducto = async (req, res) => {
  const {
    codigo_producto,
    descripcion,
    unidad_venta,
    codigo_categoria,
    codigo_subcategoria,
    contenido,
    info_adicional,
    foto,
    moneda,
    valor_venta,
    tasa_impuesto,
    precio_venta
  } = req.body;

  try {
    await db.execute(
      `INSERT INTO producto 
      (codigo_producto, descripcion, unidad_venta, codigo_categoria, codigo_subcategoria, contenido, info_adicional, foto, moneda, valor_venta, tasa_impuesto, precio_venta, estado_registro)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'A')`,
      [codigo_producto, descripcion, unidad_venta, codigo_categoria, codigo_subcategoria, contenido, info_adicional, foto, moneda, valor_venta, tasa_impuesto, precio_venta]
    );
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const datos = req.body;

  try {
    const campos = Object.keys(datos).map(key => `${key} = ?`).join(', ');
    const valores = [...Object.values(datos), id];
    await db.execute(`UPDATE producto SET ${campos} WHERE id_producto = ?`, valores);
    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

exports.darDeBajaProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('UPDATE producto SET estado_registro = "I" WHERE id_producto = ?', [id]);
    res.json({ message: 'Producto dado de baja' });
  } catch (error) {
    res.status(500).json({ error: 'Error al dar de baja producto' });
  }
};
