const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    group_id: String,
    user_id: String,
    message: String,
    sendTime: { type: Date, default: Date.now() }
}, { timestamps: true })

const message = mongoose.model('vichar', MessageSchema, 'vichar')

module.exports = message