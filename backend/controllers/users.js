const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: 'Error al obtener los usuarios' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
  .orFail(() => {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  })
  .then(user => res.send({ data: user }))
  .catch(err => {
    const ERROR_CODE = err.statusCode || 500;
    res.status(ERROR_CODE).send({ message: err.message || 'Error al obtener el usuario' });
  });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => {
    return User.create({ name, about, avatar, email, password });
    })
    .then(user => res.status(201).send({ data: user }))
    .catch(err => {
      const ERROR_CODE = err.name === 'ValidationError' ? 400 : 500;
      res.status(ERROR_CODE).send({ message: 'Error al crear el usuario' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true }
  )
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.send({ data: user });
  })
  .catch(err => {
    const ERROR_CODE = err.name === 'ValidationError' ? 400 : 500;
    res.status(ERROR_CODE).send({ message: 'Error al actualizar el avatar' });
  });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true }
  )
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.send({ data: user });
  })
  .catch(err => {
    const ERROR_CODE = err.name === 'ValidationError' ? 400 : 500;
    res.status(ERROR_CODE).send({ message: 'Error al actualizar el avatar' });
  });
}

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

