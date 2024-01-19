require('dotenv').config();

const express = require("express")
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const server = require('http').createServer(app)
const { Server } = require("socket.io")


const DB = require('./database/CreateDB')
const UsersSchema = require('./model/UserSchema')
const GroupSchema = require('./model/GroupSchema')
const MessageSchema = require('./model/MessageSchema')
const MembersSchema = require('./model/GroupMembers')

const routes = require('./routes/routes')

const PORT = process.env.PORT || 3000;


const config = {
    origin: ['http://localhost:5173'],
    credentials: true,
}

app.use(cors(config))

const io = new Server(server,{
    cors:"http://localhost:3000"
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req,res,next)=>{
    console.log("Path: ",req.path);
    console.log("Body: ",req.body);
    next();
})

app.use('/',routes);


try {
    DB.init()
    console.log("Database Connected...");
    io.on('connect',(socket)=>{
        console.log('User Connected: ',socket.id);
        socket.on('disconnect',()=>{
            console.log('User Disconnected: ',socket.id);
        })
        socket.on('join room',(data)=>{
            const roomId = data.groupId
            // const isGroupExists = null;

            // if(!isGroupExists){
            //     //response not exists
            // }

            user[socket.id]={roomId: roomId}
            socket.join(roomId)
        })
        // socket.on('chatData',response controller)
    })
    server.listen(PORT, (req, res) => {
        console.log("Hearing PORT: ", PORT);
    })
} catch (err) {
    console.log("Connection Error: ", err);
}