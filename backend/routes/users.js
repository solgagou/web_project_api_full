const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateUser } = require('../middlewares/validators');
const auth = require('../middlewares/auth');
const { getAllUsers, getUser, getCurrentUser, updateProfile, updateAvatar } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', auth, getCurrentUser)
router.get('/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUser)

router.patch('/me', auth, validateUser, updateProfile);
router.patch('/me/avatar', auth, updateAvatar);


module.exports = router;


