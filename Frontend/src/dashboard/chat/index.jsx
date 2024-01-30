import { useContext, useEffect, useState } from 'react'

import style from "./style.module.css"
import { message } from 'antd'
// import {socket} from '../../socket'
import { SocketContext } from '../../states/chatSocketState'
import Messages from './messages'


export default function Chat({ chatId, path }) {

    const [messages, setMessages] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const socket = useContext(SocketContext)
    const [pages, setPages] = useState(0)
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
        }
        setMessages('')
    }

    function loadMsg() {
        fetch(`${path}/loadmessages`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'authorization': localStorage.getItem('jwt'),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ chatId, pages, max })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.chatMessage.length);
                if (res.chatMessage.length>0){
                    console.log('sdfg')
                    res.chatMessage.reverse();
                    setAllMessages([...allMessages,res.chatMessage])
                    setPages(prevPages=>prevPages+max)
                }
            })
            .catch(err => message.error(err.message))
    }

    const HandleScroll = ()=>{
        const scrollElement = document.getElementById('ChatBox')
        if(scrollElement.scrollTop !== 0)
        return
        loadMsg(10)
    }

    socket.on('newmessage', (res) => {
        console.log('NewMessage', res)
        setAllMessages([...allMessages, res])
    })

    useEffect(() => {
        if (chatId) {
            // console.log('ChatId: ', chatId)
            // console.log('Socket: ', socket)

            loadMsg(0)

            socket.emit('openGroup', chatId)
        }
    }, [chatId])

    useEffect(() => {
        const scrollElement = document.getElementById('ChatBox')
        scrollElement.addEventListener('scroll',HandleScroll)
        scrollElement.scrollTo(0,scrollElement.scrollHeight)
        return ()=> scrollElement.removeEventListener('scroll',HandleScroll)
    }, [pages])


    return (
        <div className={style.chat_container}>
            <div className={style.message_container} id='ChatBox'>
                {allMessages.map(ele => <Messages prop={ele} />)}
            </div>
            <div className={style.message_input}>
                <input type="text" placeholder='Message' onChange={(e) => { setMessages(e.target.value) }} />
                <button type="button" onClick={() => SendMsg()}>Send</button>
            </div>
        </div>
    )
}