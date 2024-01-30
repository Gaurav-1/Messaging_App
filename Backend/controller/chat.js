const mongoose = require('mongoose')
const MessageSchema = require('../model/MessageSchema')
const GroupMembers = require('../model/GroupMembers')
const UserSchema = require('../model/UserSchema')


async function insertChat(req) {
    try {
        const isGroup = await GroupMembers.findOne({ userId: req.data.id, groupId: req.request.groupId }).exec()
        console.log(isGroup)
        if (isGroup) {
            const msgobj = {
                userId: req.data.id,
                message: req.request.message,
                sendTime: req.request.sendOn
            }
            //update the schema
            await MessageSchema.updateOne({ groupId: req.request.groupId }, { $push: { msg: msgobj }, $inc: { msgCount: 1 } }).exec()
            await UserSchema.updateOne({ _id: req.data.id }, { $inc: { posts: 1 } }).exec()

            return (msgobj)
            // res.status(200).json({ message: 'Message send successfully' })
        }
        else {
            return ('Message not recived')
            // res.status(401).json({warning: "You are not the member of this group"})
        }
    } catch (err) {
        console.log("Insert Chat Error: ", err);
        return (`Error in reciving message`)
    }
}

async function loadChat(req, res) {
    try {
        let msg = await MessageSchema.aggregate([
            { $match: { groupId: new mongoose.Types.ObjectId(req.body.chatId) } },
            { $unwind: "$msg" },
            { $sort: { "msg.sendTime": -1 } },
            { $skip: req.body.pages },
            { $limit: req.body.max },
            {
                $project: {
                    _id: 0,
                    userId: "$msg.userId",
                    message: "$msg.message",
                    sendTime: "$msg.sendTime"
                }
            }
        ]);
        // console.log('T: ',messages)
        msg = msg.map(ele => {
            if (ele.userId == req.body.id) {
                ele.userId = 'me'
            }
            else {
                ele.userId = 'other'
            }
            return ele
        })
        // console.log(req.body.id)
        // console.log('Messages1: ', msg[0].msg);
        res.status(200).json({ chatMessage: msg })
    } catch (err) {
        console.log('Load Message Error: ', err);
        res.status(401).json({ error: err.message })
    }
}

module.exports = {
    insertChat,
    loadChat,
}