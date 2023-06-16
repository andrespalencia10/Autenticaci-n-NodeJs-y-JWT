const jwt = require('jsonwebtoken');

const generarJWT = (usuarioDB) => {
    const payload = {
        _id: usuarioDB._id, nombre: usuarioDB.nombre,
        email: usuarioDB.email, constrasena: usuarioDB.constrasena, rol: usuarioDB.rol
    };

    const token = jwt.sign(payload, '123456', { expiresIn: '24h' });
    return token;
}

module.exports = {
    generarJWT
}