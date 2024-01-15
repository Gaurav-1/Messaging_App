const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    mail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    region: { type: String, required: true },
    groupsJoined: [{
        groupId: { type: String, default: null },
        groupName: { type: String, default: null }
    }],
    posts: { type: Number },
    isVerified: { type: Boolean, default: false },
    JoinedOn: { type: Date, default: Date.now() },
}, { timestamps: true })

const users = mongoose.model("janta", UserSchema, "janta");

module.exports = users;