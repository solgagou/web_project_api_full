const mongoose = require('mongoose');

const cardIdSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(), // Ejemplo para un ObjectId de MongoDB
  }),
};



const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)(www\.)?[a-zA-Z0-9._~:\/?%#\[\]@!$&'()*+,;=-]+\.com([a-zA-Z0-9._~:\/?%#\[\]@!$&'()*+,;=-]*)?$/.test(v);
      },
      message: props => `${props.value} is not a valid link!`
    },

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    required: true,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }

});

module.exports = mongoose.model('card', cardSchema);