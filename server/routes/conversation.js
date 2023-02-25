const router = require('express').Router();
const Conversation = require('../models/Conversation');

const { authenticate } = require('../middleware/authenticate');

// new conversation

router.post('/', authenticate, async (req, res, next) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    })
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.body.senderId, req.body.receiverId] },
        })
        if (conversation) {
            res.send({
                msg: 'old',
                data: conversation,
            })
        }
        else {
            const savedConversation = await newConversation.save();

            res.send({
                msg: 'new',
                data: savedConversation,
            })
        }
    } catch (error) {
        next(error);
    }
})

//get conversation of a user

router.get('/:userId', authenticate, async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        })

        res.send({ data: conversation });
    } catch (error) {
        next(error);
    }
})

// get conversation with two ids

router.get('/find/:firstUserId/:secondUserId', authenticate, async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        })

        res.send({ data: conversation });
    } catch (error) {
        next(error);
    }
})

module.exports = router;
