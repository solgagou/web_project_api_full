const router = require('express').Router();
const { getAllUsers, getUser, getCurrentUser, updateProfile, updateAvatar } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', auth, getUser)
router.get('/user/me', auth, getCurrentUser)
router.patch('/me', auth, updateProfile);
router.patch('/me/avatar', auth, updateAvatar);


module.exports = router;
