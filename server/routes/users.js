const { updateuser, removeuser, getUser, followUser, unfollowUser, getUserById, getFriends } = require('../controllers/users');
const { authenticate } = require('../middleware/authenticate');
const uploadImages = require('../middleware/multer');
const User = require('../models/User');

const router = require('express').Router();

router.get('/get-user', authenticate, getUser);

router.get('/get-user/:id', getUserById);

router.put('/:id', authenticate, uploadImages, updateuser);

router.delete('/:id', authenticate, removeuser);

router.put('/:id/follow', authenticate, followUser);

router.put('/:id/unfollow', authenticate, unfollowUser);

router.get('/friends/:id', getFriends);

router.get('/all-users', async (req, res, next) => {
    try {
        let regex_search_term = RegExp(req.query.username, 'i');
        let users = await User.aggregate([
            {
                $match: { username: regex_search_term }
            }
        ]);

        res.send({ data: users });
    } catch (error) {
        next(error);
    }
})

module.exports = router;