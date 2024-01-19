import { useState, useEffect } from "react"

import style from "./style.module.css"

import CreateGroup from "./createGroup"
import { message } from "antd"

import GroupList from "./groupList"
// import Chat from "./chat"
// import TopActive from "./topActive"

export default function dashboard() {
    const [myGroup, setMyGroup] = useState([])
    const [topActiveGroups, setTopActiveGroups] = useState([])
    const [chat, setChat] = useState('')
    const [startChat, setStartChat] = useState(false)
    const [createGroup, setCreateGroup] = useState(false)
    const [isGroupCreated, setIsGroupCreated] = useState(false)

    function MyGroup() {
        fetch('http://localhost:3000/mygroups', {
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem('jwt'),
                'Content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res?.message) {
                    message.info(res.message)
                    return;
                }
                if (res?.groups) {
                    const newObj = res.groups.map(ele=>{ return(ele.groupId)})
                    setMyGroup(newObj)
                }
            })
            .catch(err => {
                message.error(err.message)
                console.log(err);
            })
    }

    function TopActiveGroup() { }

    function HandelChat() {
        setStartChat(!startChat)
        setChat(chat)
    }

    function HandelCreateGroup() {
        setCreateGroup(!createGroup)
    }

    function IsGroupCreated(newGroup) {
        setMyGroup([...myGroup, newGroup])
        setIsGroupCreated(!isGroupCreated)
    }

    useEffect(() => { MyGroup() }, [isGroupCreated])


    return (
        <>
            <div className={style.container}>
                {createGroup ? (<div className={style.create_group}>
                    <span onClick={(e) => HandelCreateGroup()} className={style.close_popup}>x</span>
                    <CreateGroup IsGroupCreated={IsGroupCreated} />
                </div>) : null
                }
                <div className={style.my_group_list}>
                    <div className={style.operations}>
                        <button className={style.btn} onClick={(e) => HandelCreateGroup()}>Create Group</button>
                        <button className={style.btn}>Join Group</button>
                    </div>
                    <div className={style.groups_names}>
                        { myGroup.map(ele => <GroupList props={ele} />) }
                    </div>
                </div>
                {/* <div className={style.top_active_group}>
                    {topActiveGroups.map(ele => <TopActive props={ele} />)}
                </div>
                <div className={style.chat}>
                    {chat!='' ? <Chat props={chat} /> : null}
                </div> */}
            </div>
        </>
    )
}