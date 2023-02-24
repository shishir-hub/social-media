const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;
const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: [ObjectId],
            ref: "users",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);