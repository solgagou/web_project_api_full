const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const userSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Jacques Cousteau'),
    about: Joi.string().min(2).max(30).default('Explorador'),
    avatar: Joi.string().custom(validateURL).default('https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg'),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

const cardSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
};

const cardIdSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  userSchema,
  cardSchema,
  validateUser: celebrate(userSchema),
  validateCard: celebrate(cardSchema),
  validateCardId: celebrate(cardIdSchema),
};