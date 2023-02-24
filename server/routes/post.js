const { createPost, updatePost, likePost, deletePost, getPost, getTimelinePosts, getAllPosts, getMyAllPosts } = require('../controllers/post');
const { authenticate } = require('../middleware/authenticate');

const router = require('express').Router();

const uploadImages = require('../middleware/multer');

router.post('/', authenticate, uploadImages, createPost);

router.put('/:id', authenticate, updatePost);

router.put('/:id/like', authenticate, likePost);

router.delete('/:id', authenticate, deletePost);

router.get('/timeline/:id', authenticate, getPost);

router.get('/timeline', authenticate, getTimelinePosts);

router.get('/', authenticate, getAllPosts);

router.get('/myposts/:userId', getMyAllPosts);

module.exports = router;