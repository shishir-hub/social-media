const { default: mongoose } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");


const createPost = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        let newPost = await Post.create({
            ...req.body,
            userId: user._id,
        });

        res.send({ msg: 'Post Created', data: newPost });
    } catch (error) {
        next(error);
    }
}

const updatePost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);
        let user = await User.findById(post.userId);
        if (user._id.equals(req.user._id)) {
            await Post.findByIdAndUpdate(post._id, {
                ...req.body
            }, { new: true });

            res.send({ msg: "Post has been updated" });
        }
        else {
            res.status(403).send({ msg: "You cannot update other's Posts" });
        }
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);
        let user = await User.findById(post.userId);
        if (user._id.equals(req.user._id)) {
            await Post.findByIdAndDelete(post._id);

            res.send({ msg: "Post has been deleted" });
        }
        else {
            res.status(403).send({ msg: "You cannot delete other's Posts" });
        }
    } catch (error) {
        next(error);
    }
}

const likePost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post.likes.includes(req.user._id)) {
            await Post.findByIdAndUpdate(post._id, {
                $push: { likes: req.user._id }
            }, { new: true });

            res.send({ msg: "Post has been liked" });
        }
        else {
            await Post.findByIdAndUpdate(post._id, {
                $pull: { likes: req.user._id }
            }, { new: true });

            res.send({ msg: "Post has been disliked" });
        }
    } catch (error) {
        next(error);
    }
}

const getPost = async (req, res, next) => {
    try {
        let posts = await Post.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'posted_by'
                },
            },
            {
                $unwind: '$posted_by'
            },
            {
                $sort: { createdAt: -1 }
            }
        ])
        res.send({ msg: "Post", data: posts });
    } catch (error) {
        next(error);
    }
}

const getTimelinePosts = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const userPosts = await Post.aggregate([
            {
                $match: { userId: user._id },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'posted_by'
                },
            },
            {
                $unwind: '$posted_by'
            },
            {
                $sort: { createdAt: -1 }
            }
        ])
        const friendPosts = await Promise.all(
            user.followings.map((friendId) => {
                return Post.aggregate([
                    {
                        $match: { userId: friendId }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'posted_by'
                        },
                    },
                    {
                        $unwind: '$posted_by'
                    },
                    {
                        $sort: { createdAt: -1 }
                    }
                ])
            })
        );
        res.send({ msg: "Posts", data: userPosts.concat(...friendPosts) });
    } catch (error) {
        next(error);
    }
}

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'posted_by'
                },
            },
            {
                $unwind: '$posted_by'
            }
        ])

        res.send({ msg: 'All Posts', data: posts });
    } catch (error) {
        next(error);
    }
}

const getMyAllPosts = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        const userPosts = await Post.aggregate([
            {
                $match: { userId: user._id },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'posted_by'
                },
            },
            {
                $unwind: '$posted_by'
            }
        ]);
        res.send({ msg: 'My Posts', data: userPosts });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    getTimelinePosts,
    getAllPosts,
    getMyAllPosts,
}

