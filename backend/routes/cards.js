const router = require('express').Router();
const { celebrate } = require('celebrate');
const { validateCard, validateCardId } = require('../middlewares/validators');
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

router.get('/', auth, getCards);
router.post('/', auth, validateCard, createCard)
router.delete('/:cardId', auth, validateCardId, deleteCard);
router.put('/:cardId/likes', auth, validateCardId, likeCard);
router.delete('/:cardId/likes', auth, validateCardId, dislikeCard);


module.exports = router;
