const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    adminId: { type: mongoose.Schema.ObjectId, require: true, ref: 'janta' },
    createdDate: { type: Date, default: Date.now() },
}, { timestamps: true })

const group = mongoose.model('ward', GroupSchema, 'ward')

module.exports = group