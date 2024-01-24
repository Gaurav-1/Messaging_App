import { useContext, useEffect, useState } from 'react'

import style from "./style.module.css"
import { message } from 'antd'
// import {socket} from '../../socket'
import { SocketContext } from '../../states/chatSocketState'


export default function Chat({ chatId, path }) {

    const [messages, setMessages] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const socket = useContext(SocketContext)
    const max = 10;

    function SendMsg() {

        if (messages.trim()) {
            const msg = {
                'message': messages,
                'groupId': chatId,
                'token': localStorage.getItem('jwt'),
                'sendOn': new Date()
            }
            socket.emit('message', msg)
            setAllMessages([...allMessages, msg])
        }
        setMessages('')



        // fetch(`${path}/messages`, {
        //     method: 'POST',
        //     headers: {
        //         'authorization': localStorage.getItem('jwt'),
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(message)
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         if (res?.message) {
        //             message.info(res?.message)
        //             return
        //         }
        //         setAllMessages([res.chatMessage, ...allMessages])
        //     })
        //     .catch(err => {
        //         message.error('Error: ', err.message)
        //         console.log('Send Message Error', err);
        //     })
    }

    function loadMsg(start) {
        fetch(`${path}/loadmessages`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'authorization': localStorage.getItem('jwt'),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({chatId, start, max})
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res?.chatMessage)
                    setAllMessages(res.chatMessage)
            })
            .catch(err => message.error(err.message))
    }

    function HandleReply(res){
        setAllMessages([...allMessages,res])
    }

    useEffect(() => {
        if (chatId) {
            console.log('ChatId: ',chatId)
            console.log('Socket: ',socket)

            loadMsg(0)

            // socket.connect()
            socket.emit('opengroup', chatId)
            socket.on('newmessage',HandleReply)
        }
    }, [chatId])


    return (
        <div className={style.chat_container}>
            <div className={style.message_container}>
                {allMessages.map(ele=>{<p>{console.log(ele)}{ele}</p>})}
            </div>
            <div className={style.message_input}>
                <input type="text" onChange={(e) => { setMessages(e.target.value) }} />
                <button type="button" onClick={() => SendMsg()}>Send</button>
            </div>
        </div>
    )
}