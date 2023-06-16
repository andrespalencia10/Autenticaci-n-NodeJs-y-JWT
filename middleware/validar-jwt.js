const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ mensaje: 'Error unauthorized' });

  try {
    req.payload = jwt.verify(token, '123456');
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ mensaje: 'Error unauthorized' });
  }
};

module.exports = { validarJWT };