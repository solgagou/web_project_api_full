const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(403)
      .send({ message: 'Se requiere autorización' });
  }

  const token = authorization.replace('Bearer ', '');
  console.log('Token:', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Payload del token:', payload);
  } catch (err) {
    return res
      .status(403)
      .send({ message: 'Token inválido o caducado' });
  }

  req.user = payload;

  next();
};
