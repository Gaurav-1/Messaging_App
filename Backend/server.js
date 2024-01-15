const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { Server } = require("socket.io")

const DB = require('./database/CreateDB')
const UsersSchema = require('./database/UserSchema')
const GroupSchema = require('./database/GroupSchema')
const MessageSchema = require('./database/MessageSchema')

const PORT = process.env.PORT || 1;

const app = express();

const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


try {
    DB.init()
    console.log("Database Connected...");
    app.listen(PORT, (req, res) => {
        console.log("Hearing PORT: ", PORT);
    })
} catch (err) {
    console.log("Connection Error: ", err);
}