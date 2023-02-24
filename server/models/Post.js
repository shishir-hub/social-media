const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;
const PostSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "users",
        required: true,
    },
    desc: {
        type: String,
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);