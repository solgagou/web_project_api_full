const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find()
    .populate('owner')
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({ message: 'Error al obtener las tarjetas' }));
};

module.exports.createCard = (req, res) => {
   const { name, link, owner: _id } = req.body;

  Card.create({ name, link, owner })
  .then(card => res.status(201).send(card))
  .catch(err => {
    const ERROR_CODE = err.name === 'ValidationError' ? 400 : 500;
    res.status(ERROR_CODE).send({ message: 'Error al crear la tarjeta' });
  });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
  .orFail(() => {
    const error = new Error("Tarjeta no encontrada");
    error.statusCode = 404;
    throw error;
    })
    .then(card => {
      if (card.owner.toString() !== req.user._id.toString()) {
        return res.status(403).send({ message: 'No tienes permisos para eliminar esta tarjeta.' });
      }

     return Card.findByIdAndRemove(cardId)
    .then(() => res.send({ message: 'Tarjeta eliminada exitosamente' }));
    })
    .catch(err => {
      const ERROR_CODE = err.statusCode || 500;
      res.status(ERROR_CODE).send({ message: err.message || 'Error al eliminar la tarjeta' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(card => {
    if (!card) {
      return res.status(404).send({ message: 'Tarjeta no encontrada' });
    }
    res.send(card);
  })
  .catch(err => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID de tarjeta no válido' });
    }
    res.status(500).send({ message: 'Error al dar like a la tarjeta' });
  });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => {
    if (!card) {
      return res.status(404).send({ message: 'Tarjeta no encontrada' });
    }
    res.send(card);
  })
  .catch(err => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID de tarjeta no válido' });
    }
    res.status(500).send({ message: 'Error al dar unlike a la tarjeta' });
  });
};