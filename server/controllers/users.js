const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const updateuser = async (req, res, next) => {
    try {
        if (req.user._id === req.params.id) {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const user = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
            let user_obj = user.toObject();
            delete user_obj.password;
            let data = { ...user_obj };
            delete user_obj.coverPicture;
            delete user_obj.profilePicture;
            let token = jwt.sign(user_obj, process.env.JWT_SECRET);

            res.send({ msg: 'User updated', data: data, token });
        }
        else {
            res.status(403).send({ msg: 'You can only change your account' });
        }

    } catch (error) {
        next(error);
    }
}

const removeuser = async (req, res, next) => {
    try {
        if (req.user._id === req.params.id) {
            await User.findByIdAndDelete(req.params.id);

            res.send({ msg: 'User Deleted' });
        }
        else {
            res.status(403).send({ msg: 'You can only change your account' });
        }
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        let user_data = await User.findOne({ email: req.user.email });
        let user_obj = user_data.toObject();
        delete user_obj.password;
        res.send({ data: user_obj });
    } catch (error) {
        next(error);
    }
}

const getFriends = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        let friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map(friend => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        })
        res.send({
            msg: "Friend Lists",
            data: friendList,
        })
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        let user_data = await User.findById(req.params.id);
        let user_obj = user_data.toObject();
        delete user_obj.password;
        res.send({ data: user_obj });
    } catch (error) {
        next(error);
    }
}

const followUser = async (req, res, next) => {
    try {
        if (req.params.id !== req.user._id) {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user._id);
            if (!user.followers.includes(currentUser._id)) {
                await User.findByIdAndUpdate(user._id, {
                    $push: { followers: currentUser._id }
                });
                await User.findByIdAndUpdate(currentUser._id, {
                    $push: { followings: user._id }
                });
                res.send({ msg: "Following Successful" });
            }
            else {
                res.status(403).send({ msg: 'You already follow this account' });
            }
        }
        else {
            res.status(403).send({ msg: 'You cannot follow yourself' });
        }
    } catch (error) {
        next(error);
    }
}

const unfollowUser = async (req, res, next) => {
    try {
        if (req.params.id !== req.user._id) {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user._id);
            if (user.followers.includes(currentUser._id)) {
                await User.findByIdAndUpdate(user._id, {
                    $pull: { followers: currentUser._id }
                });
                await User.findByIdAndUpdate(currentUser._id, {
                    $pull: { followings: user._id }
                });
                res.send({ msg: "Unfollowing Successful" });
            }
            else {
                res.status(403).send({ msg: 'You donot follow this account' });
            }
        }
        else {
            res.status(403).send({ msg: 'You cannot unfollow yourself' });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    updateuser,
    removeuser,
    getUser,
    followUser,
    unfollowUser,
    getUserById,
    getFriends,
}