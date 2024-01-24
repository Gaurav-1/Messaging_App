const mongoose = require("mongoose")

const MembersSchema = new mongoose.Schema({
    groupId: {type: mongoose.Schema.ObjectId, ref:'group'},
    userId: {type: mongoose.Schema.ObjectId, ref: 'user'},
    joinedOn: {type: Date, default: Date.now()}
}, { timestamps: true })

const members = mongoose.model('members', MembersSchema, 'members')

module.exports = members