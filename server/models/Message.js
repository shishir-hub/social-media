const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;
const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: ObjectId,
        ref: 'conversations'
    },
    sender: {
        type: ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);