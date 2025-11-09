// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para generar un token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // El token expirará en 30 días
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear el nuevo usuario
    const user = await User.create({
      nombre,
      email,
      password, // El hash se hace automáticamente gracias al middleware en el modelo
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// @desc    Autenticar (iniciar sesión) un usuario
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por email
    const user = await User.findOne({ email }).select('+password'); // Incluimos el password para comparar

    // Comparar la contraseña ingresada con la encriptada
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (isMatch) {
      res.json({
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { registerUser, loginUser };