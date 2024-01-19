const mongoose = require('mongoose')
const GroupSchema = require('../model/GroupSchema')
const MessageSchema = require('../model/MessageSchema')


function insert_chat(socket){
    return function (msg){
        const room=msg.sendBy+'@'+msg.sendTo;
        const room2 = msg.sendTo+'@'+msg.sendBy
        
        const chat_data='';
        let existingRoom = chat_data.find(item=>Object.keys(item)[0]===room);
        if(!existingRoom){
            existingRoom=chat_data.find(item=>Object.keys(item)[0]===room2)
        }
        if(!existingRoom){
            console.log('Room Not Exist');
            return;
        }
        let whichRoom;
        temp = chat_data.find(item=>{
            if(Object.keys(item)[0]===room){
                whichRoom = room;
            }
            else if(Object.keys(item)[0]===room2){
                whichRoom = room2;
            }
        })
        
        existingRoom[whichRoom].push({
            sendBy: msg.sendBy,
            msg: msg.msg
        })
        const res = {
            sendBy: msg.sendBy,
            msg: msg.msg
        }
        // fs.writeFileSync(dbDir+'/data.json',JSON.stringify(chat_data,null,2));
        
        const {roomid}=user[socket.id];
        io.to(roomid).emit('reply',res)
        return;
}
}

function send_chat(socket){
    return function (msg){
        const room=msg.sendBy+'@'+msg.sendTo;
        const room2 = msg.sendTo+'@'+msg.sendBy
        
        const chat_data=JSON.parse(fs.readFileSync(dbDir+'/data.json','utf-8'));
        let existingRoom = chat_data.find(item=>Object.keys(item)[0]===room);
        if(!existingRoom){
            existingRoom=chat_data.find(item=>Object.keys(item)[0]===room2)
        }
        if(!existingRoom){
            console.log('Room Not Exist');
            return;
        }
        
        const {roomid}=user[socket.id];
        io.to(roomid).emit('chat data reply',existingRoom)
    }
}