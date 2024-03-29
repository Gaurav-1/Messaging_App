const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    mail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    region: { type: String, required: true },
    posts: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    JoinedOn: { type: Date, default: Date.now() },
}, { timestamps: true })

const users = mongoose.model("user", UserSchema, "user");

module.exports = users;