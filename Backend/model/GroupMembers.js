const mongoose = require("mongoose")

const MembersSchema = new mongoose.Schema({
    groupId: {type: mongoose.Schema.ObjectId, ref:'ward'},
    userId: {type: mongoose.Schema.ObjectId, ref: 'janta'},
    joinedOn: {type: Date, default: Date.now()}
}, { timestamps: true })

const members = mongoose.model('members', MembersSchema, 'members')

module.exports = members