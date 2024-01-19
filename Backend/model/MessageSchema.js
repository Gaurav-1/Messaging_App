const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    group_id: {type: mongoose.Schema.ObjectId, ref: 'ward'},
    msg: [{
        user_id: {type: mongoose.Schema.ObjectId, ref: 'janta'},
        message: String,
        sendTime: { type: Date, default: Date.now() }
    }],
    msgCount: {type: Number, default: 0}
}, { timestamps: true })

const message = mongoose.model('vichar', MessageSchema, 'vichar')

module.exports = message