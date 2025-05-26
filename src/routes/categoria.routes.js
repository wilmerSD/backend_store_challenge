const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');

// Obtener categorías en modo árbol
router.get('/', categoriaController.obtenerCategorias);

// Crear una categoría o subcategoría
router.post('/', categoriaController.crearCategoria);

// Actualizar una categoría o subcategoría
router.put('/:id', categoriaController.actualizarCategoria);

// Dar de baja una categoría o subcategoría (estado_registro = 'I')
router.delete('/:id', categoriaController.darDeBajaCategoria);

module.exports = router;
