// Backend modularizado con Node.js, Express y MySQL
const express = require('express');
const cors = require('cors');
const app = express();
// const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Opcional, pero recomendable

// Rutas
const productoRoutes = require('./src/routes/producto.routes');
const categoriaRoutes = require('./src/routes/categoria.routes');
const authRoutes = require('./src/routes/auth.routes');

// Usar las rutas
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/auth', authRoutes);

// Iniciar servidor
/* app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
}); */
module.exports = app;