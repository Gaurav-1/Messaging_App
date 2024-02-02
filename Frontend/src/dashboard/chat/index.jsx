import { useContext, useEffect, useState } from 'react'
import ScrollableFeed from  'react-scrollable-feed'

import style from "./style.module.css"
import { message } from 'antd'
// import {socket} from '../../socket'
import { SocketContext } from '../../states/chatSocketState'
import Messages from './messages'
import { useNavigate } from 'react-router-dom'


export default function Chat({ chatId, path, CurrentUser }) {

    const [messages, setMessages] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const socket = useContext(SocketContext)
    const [pages, setPages] = useState(0)
    const navigate = useNavigate();
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
            .then(async res =>{ 
                if(res.status == 401){
                    const err = await res.json()
                    throw new Error(err.error)
                }
                else
                    return res.json()
            })
            .then(res => {
                if (res.chatMessage.length>0){
                    res.chatMessage.reverse();
                    if(pages==0)
                        setAllMessages(res.chatMessage)
                    else
                        setAllMessages([...res.chatMessage,...allMessages])
                    setPages(pages+max)
                }
            })
            .catch(err =>{
                message.error(err.message)
                setTimeout(()=>navigate('/signout'),1000)
            })
    }

    const HandleScroll = ()=>{
        const scrollElement = document.getElementById('ChatBox')
        if(scrollElement.scrollTop !== 0)
        return
        loadMsg(10)
    }

    useEffect(() => {
        if (chatId) {

            loadMsg(0)

            socket.emit('openGroup', chatId)
        }
    }, [chatId])
    
    useEffect(() => {
        const scrollElement = document.getElementById('ChatBox')
        scrollElement.addEventListener('scroll',HandleScroll)
        console.log('Scroll: ',scrollElement.scrollHeight)
        scrollElement.scrollTo(0,scrollElement.scrollHeight)
        return ()=> scrollElement.removeEventListener('scroll',HandleScroll)
    }, [pages])

    socket.on('newmessage', (res) => {
        console.log('NewMessage', res)
        setAllMessages([...allMessages, res])
    })

    return (
        <div className={style.chat_container}>

            <div className={style.message_container} id='ChatBox'>
                {allMessages.map(ele =>{ return <Messages prop={ele} CurrentUser={CurrentUser} />})}
            </div>
            <div className={style.message_input}>
                <input type="text" placeholder='Message' onChange={(e) => { setMessages(e.target.value) }} />
                <button type="button" onClick={() => SendMsg()}>Send</button>
            </div>
        </div>
    )
}