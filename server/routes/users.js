const { updateuser, removeuser, getUser, followUser, unfollowUser, getUserById, getFriends } = require('../controllers/users');
const { authenticate } = require('../middleware/authenticate');
const uploadImages = require('../middleware/multer');

const router = require('express').Router();

router.get('/get-user', authenticate, getUser);

router.get('/get-user/:id', getUserById);

router.put('/:id', authenticate, uploadImages, updateuser);

router.delete('/:id', authenticate, removeuser);

router.put('/:id/follow', authenticate, followUser);

router.put('/:id/unfollow', authenticate, unfollowUser);

router.get('/friends/:id', getFriends);

module.exports = router;