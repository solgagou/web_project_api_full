const Card = require('../models/card');
//const validator = require('validator');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .populate('owner')
    .then(cards => res.send(cards))
    .catch(next); // antes: (err => res.status(500).send({ message: 'Error al obtener las tarjetas' }));
};

module.exports.createCard = (req, res, next) => {
   const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
  .then(card => res.status(201).send(card))
  .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  if (!cardId) {
    return res.status(400).send({ message: 'ID de tarjeta no proporcionado' });
  }
  console.log('Intentando eliminar tarjeta con ID:', cardId);

  Card.findById(cardId)
    .orFail(() => {
      const error = new CustomError('Tarjeta no encontrada', 404);
      throw error;
    })
    .then(card => {
      console.log('Tarjeta encontrada:', card);
      if (card.owner.toString() !== req.user._id.toString()) {
        const error = new CustomError('No tienes permisos para eliminar esta tarjeta.', 403);
        throw error;
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then(() => {
      console.log('Tarjeta eliminada exitosamente');
      res.send({ message: 'Tarjeta eliminada exitosamente' });
    })
    .catch(err => {
      console.error('Error en deleteCard:', err);
      next(err);
  });
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