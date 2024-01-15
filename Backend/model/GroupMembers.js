const mongoose = require("mongoose")

const MembersSchema = new mongoose.Schema({
    groupId: mongoose.Schema.ObjectId,
    userId: mongoose.Schema.ObjectId,
    joinedOn: {type: Date, default: Date.now()}
}, { timestamps: true })

const members = mongoose.model('members', MembersSchema, 'members')

module.exports = members