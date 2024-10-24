const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});


userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  console.log('Buscando usuario con email:', email);
  return this.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      console.warn('Usuario no encontrado');
      return Promise.reject(new Error('Incorrect email or password'));
    }
    console.log('Usuario encontrado:', user);
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        console.log('Contraseña coincidente:', matched);
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }

        return user;
      });
  });
};


module.exports = mongoose.model('user', userSchema);