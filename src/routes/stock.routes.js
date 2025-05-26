// routes/stock.routes.js

const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');

router.get('/', stockController.obtenerStock);
router.post('/', stockController.registrarCompra);

module.exports = router;