require('dotenv').config();

const express = require("express")
const app = express();
const server = require('http').createServer(app)
const { Server } = require("socket.io")

const mongoose = require("mongoose")
const cors = require("cors")

const DB = require('./database/CreateDB')
const UsersSchema = require('./model/UserSchema')
const GroupSchema = require('./model/GroupSchema')
const MessageSchema = require('./model/MessageSchema')
const MembersSchema = require('./model/GroupMembers')

const { verifyToken } = require('./utils/TokenHandler')
const { insertChat } = require('./controller/chat')

const routes = require('./routes/routes')

const PORT = process.env.PORT || 3000;


const config = {
    origin: ['http://localhost:5173'],
    credentials: true,
}

app.use(cors(config))

const io = new Server(server, {
    cors: "http://localhost:5173"
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log("Path: ", req.path);
    console.log("Body: ", req.body);
    next();
})

app.use('/', routes);


try {
    DB.init()
    console.log("Database Connected...");
    io.on('connection', (socket) => {
        console.log('User Connected: ', socket.id);
        socket.on('disconnect', () => {
            console.log('User Disconnected: ', socket.id);
        })

        socket.on('openGroup', async (groupId) => {
            // console.log('Load Chat: ',groupId)
            const isGroup = await GroupSchema.find({id: groupId}).exec()
            if(!isGroup){
                socket.emit('error','Group not exists')
                return
            }
            socket.join(groupId)
        })

        socket.on('message', async (request) => {
            console.log('Message Recived: ', request)
            const data = verifyToken(request.token)
            
            delete request.token
            
            const response = await insertChat({request,data})
            
            if(response.userId == data.id){
                response.userId = 'me'
            }
            else
                response.userId = 'other'

            console.log('Response: ',response)
            io.to(request.groupId).emit('newmessage', response)
            return;
        })
    })
    server.listen(PORT, (req, res) => {
        console.log("Hearing PORT: ", PORT);
    })
} catch (err) {
    console.log("Connection Error: ", err);
}