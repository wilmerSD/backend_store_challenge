// Backend modularizado con Node.js, Express y MySQL
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Opcional, pero recomendable
const io = new Server(server, {
  cors: {
    origin: "*", // ⚠️ para pruebas. En producción, especifica el dominio de tu app Flutter
    methods: ["GET", "POST"]
  }
});

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