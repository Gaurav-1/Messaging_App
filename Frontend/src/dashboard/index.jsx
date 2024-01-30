import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom";

import style from "./style.module.css"

import CreateGroup from "./createGroup"
import { message } from "antd"

import GroupList from "./groupList"
import Chat from "./chat"
// import TopActive from "./topActive"

export default function dashboard() {
    const [myGroup, setMyGroup] = useState([])
    const [topActiveGroups, setTopActiveGroups] = useState([])
    const [chatId, setChatId] = useState('')
    const [startChat, setStartChat] = useState(false)
    const [createGroup, setCreateGroup] = useState(false)
    const [isGroupCreated, setIsGroupCreated] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const path = import.meta.env.VITE_PATH

    function MyGroup() {
        fetch(`${path}/mygroups`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
                'Content-type': 'application/json'
            },
        })
            .then(res =>{
                // if(res.status == 200)
                    return res.json()
                // else
                // console.log('Error: ',res.json())
                    // throw new Error(res.json().error)
                })
            .then(res => {
                console.log('Res: ',res)
                if (res?.message) {
                    message.info(res.message)
                    return;
                }
                if (res?.groups) {
                    const newObj = res.groups.map(ele => { return (ele.groupId) })
                    setMyGroup(newObj)
                }
            })
            .catch(err => {
                message.error(err.message)
                console.log(err);
            })
    }

    function TopActiveGroup() { }

    function HandelChat(id,state) {
        setStartChat(state)
        setChatId(id)
    }

    function HandelCreateGroup() {
        setCreateGroup(!createGroup)
    }

    function IsGroupCreated(newGroup) {
        setMyGroup([...myGroup, newGroup])
        setIsGroupCreated(!isGroupCreated)
    }

    useEffect(() => { if (!localStorage.getItem('jwt')) { setIsValid(true) } }, [])

    useEffect(() => { MyGroup() }, [isGroupCreated])

    return (
        (isValid) ? <Navigate to='/' /> : (
            <>
                <div className={style.container}>
                    {createGroup ? (
                        <div className={style.create_group} >
                            <span onClick={(e) => HandelCreateGroup()} className={style.close_popup}>x</span>
                            <CreateGroup IsGroupCreated={IsGroupCreated} path={path} />
                        </div>) : null
                    }
                    <div className={style.my_group_list}>
                        <div className={style.operations}>
                            <button className={style.btn} onClick={() => HandelCreateGroup()}>Create Group</button>
                        </div>
                        <div className={style.groups_names}>
                            {myGroup.map(ele => <GroupList props={ele} key={ele._id} HandelChat={HandelChat} />)}
                        </div>
                    </div>
                    {/* <div className={style.top_active_group}>
                        {topActiveGroups.map(ele => <TopActive props={ele} />)}
                    </div>*/}
                    <div className={style.chat}>
                        {startChat ? <Chat chatId={chatId} path={path} /> : null}
                    </div>
                </div>
            </>
        ))
}