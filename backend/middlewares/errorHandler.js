const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  // Evitamos devolver información sensible o técnica en un error 500
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Error interno del servidor'
      : message,
  });

  // Llamar a next solo si es necesario (generalmente no en errores)
};

module.exports = errorHandler;