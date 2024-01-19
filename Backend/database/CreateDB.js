const mongoose = require('mongoose');

module.exports.init = async function () {
    await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.bm0gevx.mongodb.net/Panchayat?retryWrites=true&w=majority`)
}