//const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/user');


const userSchema = Joi.object({
  //body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Jacques Cousteau'),
    about: Joi.string().min(2).max(30).default('Explorador'),
    avatar: Joi.string().uri().default('https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg'),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

module.exports = mongoose.model('user', userSchema);

module.exports.createUser = (req, res) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  bcrypt.hash(value.password, 10)
    .then(hash => {
      return User.create({
        name: value.name,
        about: value.about,
        avatar: value.avatar,
        email: value.email,
        password: hash,
      });
    })
    .then(user => res.status(201).send({ data: user }))
    .catch(err => {
      const ERROR_CODE = err.name === 'ValidationError' ? 400 : 500;
      res.status(ERROR_CODE).send({ message: 'Error al crear el usuario', error: err.message });
    });
};