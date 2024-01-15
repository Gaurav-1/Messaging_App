const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    admin: { type: String, require: true },
    adminId: { type: String, require: true },
    posts: {type: Number},
    createdDate: { type: Date, default: Date.now() },
    inviteLink: { type: String }
}, { timestamps: true })

const group = mongoose.model('ward', GroupSchema, 'ward')

module.exports = group