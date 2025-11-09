// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // El token vendrá en la cabecera 'Authorization' como "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Obtener el token de la cabecera
      token = req.headers.authorization.split(' ')[1];

      // 2. Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Necesitas una JWT_SECRET en tu .env

      // 3. Buscar el usuario y adjuntarlo a la petición
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Pasa al siguiente middleware o al controlador
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'No autorizado, el token falló.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no hay token.' });
  }
};

module.exports = { protect };