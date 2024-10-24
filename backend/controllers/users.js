const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const validator = require('validator');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => {
    return User.create({ name, about, avatar, email, password: hash, });
    })
    .then(user => res.status(201).send(user))
    .catch(next); /* antes: (err => {
      const ERROR_CODE = err.name === 'ValidationError' ? 400 : 500;
      res.status(ERROR_CODE).send({ message: 'Error al crear el usuario' }); */
};

module.exports.getAllUsers = (req, res, next) => {
  User.find()
    .then(users => res.send(users))
    .catch(next); //antes: (err => res.status(500).send({ message: 'Error al obtener los usuarios' }));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
  .orFail(() => {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  })
  .then(user => res.send(user))
  .catch(next); /*antes:  {
    const ERROR_CODE = err.statusCode || 500;
    res.status(ERROR_CODE).send({ message: err.message || 'Error al obtener el usuario' });*/
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.send(user);
    })
    .catch(next); /* antes: err => {
      res.status(500).send({ message: 'Error al obtener el usuario' });
    }); */
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  /*if (req.user._id !== req.params.userId) {
    return res.status(403).send({ message: 'No tienes permisos para editar este perfil.' });
  }*/

  User.findByIdAndUpdate(req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.send(user);
  })
  .catch(next); /* antes: {
    const ERROR_CODE = err.name === 'ValidationError' ? 400 : 500;
    res.status(ERROR_CODE).send({ message: 'Error al actualizar el perfil' }); */
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.send(user);
  })
  .catch(next); /* antes:  {
    const ERROR_CODE = err.name === 'ValidationError' ? 400 : 500;
    res.status(ERROR_CODE).send({ message: 'Error al actualizar el avatar' }); */
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log('Datos recibidos en el login:', { email, password });

  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log('Usuario encontrado:', user);
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((error) => {
      console.log('Error en la autenticación:', error);
      res.status(400).send({message:error.message})
      return next()
    });
};

