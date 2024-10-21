
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;


if (err.name === 'ValidationError') {
  return res.status(400).send({ message: 'Datos inválidos proporcionados' });
}

if (err.statusCode === 403) {
  return res.status(403).send({ message: 'No tienes permisos para realizar esta acción' });
}

if (err.name === 'CastError') {
  return res.status(404).send({ message: 'ID no válido o recurso no encontrado' });
}

if (err.code === 11000) { // Código para errores de duplicados en MongoDB
  return res.status(409).send({ message: 'El correo electrónico ya existe en el servidor' });
}

// Si no se maneja ningún otro error, envía un error genérico del servidor
res.status(statusCode).send({
  message: statusCode === 500 ? 'Ha ocurrido un error en el servidor' : message,
});
};

