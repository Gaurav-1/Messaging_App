const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    groupId: {type: mongoose.Schema.ObjectId, ref: 'group'},
    msg: [{
        userId: {type: mongoose.Schema.ObjectId, ref: 'user'},
        message: String,
        sendTime: { type: Date, default: Date.now() }
    }],
    msgCount: {type: Number, default: 0}
}, { timestamps: true })

const message = mongoose.model('message', MessageSchema, 'message')

module.exports = message