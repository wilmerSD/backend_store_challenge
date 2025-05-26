// controllers/categoria.controller.js

const db = require('../services/db');

// Obtener categorías y subcategorías en modo tree view
exports.obtenerCategorias = async (req, res) => {
  try {
    const [categorias] = await db.execute('SELECT * FROM categoria WHERE estado_registro = "A"');

    // Organizar jerárquicamente
    const tree = categorias.filter(cat => cat.tipo === 'C').map(cat => ({
      ...cat,
      subcategorias: categorias.filter(sub => sub.id_padre === cat.id_categoria && sub.tipo === 'S')
    }));

    res.json(tree);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

// Crear categoría o subcategoría
exports.crearCategoria = async (req, res) => {
  const { codigo, descripcion, id_padre, tipo, imagen } = req.body;

  try {
    await db.execute(
      `INSERT INTO categoria (codigo, descripcion, id_padre, tipo, imagen, estado_registro)
       VALUES (?, ?, ?, ?, ?, 'A')`,
      [codigo, descripcion, id_padre || null, tipo, imagen]
    );
    res.status(201).json({ message: 'Categoría creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear categoría' });
  }
};

// Actualizar categoría o subcategoría
exports.actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const datos = req.body;

  try {
    const campos = Object.keys(datos).map(key => `${key} = ?`).join(', ');
    const valores = [...Object.values(datos), id];
    await db.execute(`UPDATE categoria SET ${campos} WHERE id_categoria = ?`, valores);
    res.json({ message: 'Categoría actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
};

// Dar de baja categoría o subcategoría
exports.darDeBajaCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('UPDATE categoria SET estado_registro = "I" WHERE id_categoria = ?', [id]);
    res.json({ message: 'Categoría dada de baja' });
  } catch (error) {
    res.status(500).json({ error: 'Error al dar de baja categoría' });
  }
};
