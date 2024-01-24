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
        const msg = await MessageSchema.find({ groupId: req.body.chatId }, { msg: 1, _id: 0 }).sort({ sendTime: -1 }).skip(req.body.start).limit(req.body.max).exec();
        console.log('Messages1: ', msg[0].msg);
        res.status(200).json({ chatMessage: msg[0].msg })
    } catch (err) {
        console.log('Load Message Error: ', err);
        res.status(401).json({ error: err.message })
    }
}

module.exports = {
    insertChat,
    loadChat,
}