const mongoose = require('mongoose');


const ObjectId = mongoose.Schema.ObjectId;
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    birthDate: {
        type: Date,
    },
    profilePicture: {
        type: String,
        default: ''
    },
    coverPicture: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
    },
    city: {
        type: String,
    },
    from: {
        type: String,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);