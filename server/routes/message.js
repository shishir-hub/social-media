const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const { authenticate } = require('../middleware/authenticate');
const Message = require('../models/Message');

//add message

router.post('/', authenticate, async (req, res, next) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();

        res.send({ data: savedMessage });
    } catch (error) {
        next(error);
    }
})

//get message
router.get('/:conversationId', authenticate, async (req, res, next) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })

        const message = await Message.aggregate([
            {
                $match: { conversationId: mongoose.Types.ObjectId(req.params.conversationId) },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'send_by'
                }
            },
            {
                $unwind: '$send_by'
            }
        ])

        res.send({ data: message });
    } catch (error) {
        next(error);
    }
})

module.exports = router;