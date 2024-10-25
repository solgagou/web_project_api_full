const Card = require('../models/card');
//const validator = require('validator');

module.exports.getCards = (req, res, next) => {
  Card.Card.find()
    .populate('owner')
    .then(cards => res.send(cards))
    .catch(next); // antes: (err => res.status(500).send({ message: 'Error al obtener las tarjetas' }));
};

module.exports.createCard = (req, res, next) => {
   const { name, link, owner: _id } = req.body;

  Card.create({ name, link, owner })
  .then(card => res.status(201).send(card))
  .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
  .orFail(() => {
    throw new CustomError('Tarjeta no encontrada', 404);
    })
    .then(card => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new CustomError('No tienes permisos para eliminar esta tarjeta.', 403);
      }

     return Card.findByIdAndRemove(cardId)
    .then(() => res.send({ message: 'Tarjeta eliminada exitosamente' }));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(card => {
    if (!card) {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    }
    res.send(card);
  })
  .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => {
    if (!card) {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    }
    res.send(card);
  })
  .catch(next);
};