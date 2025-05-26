// controllers/auth.controller.js

const bcrypt = require('bcrypt');
const db = require('../services/db');

// Registro de cliente
exports.register = async (req, res) => {
  const {
    nombres,
    apellido_paterno,
    apellido_materno,
    celular,
    email,
    direccion,
    codigo_postal,
    password
  } = req.body;

  try {
    const [exist] = await db.execute('SELECT * FROM cliente WHERE email = ?', [email]);
    if (exist.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    await db.execute(
      `INSERT INTO cliente (nombres, apellido_paterno, apellido_materno, celular, email, direccion, codigo_postal, estado_registro, password_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'A', ?)`,
      [nombres, apellido_paterno, apellido_materno, celular, email, direccion, codigo_postal, password_hash]
    );

    res.status(201).json({ message: 'Cliente registrado correctamente' });
  } catch (error) {
    console.error('Error en el registro:', error); 
    res.status(500).json({ error: 'Error al registrar cliente' });
  }
};

// Login de cliente
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [clientes] = await db.execute('SELECT * FROM cliente WHERE email = ? AND estado_registro = "A"', [email]);
    const cliente = clientes[0];
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    const valid = await bcrypt.compare(password, cliente.password_hash);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Retornamos datos básicos del cliente (sin token)
    res.json({
      id_cliente: cliente.id_cliente,
      nombres: cliente.nombres,
      apellido_paterno: cliente.apellido_paterno,
      email: cliente.email
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

