import { useState } from "react"
import { message } from "antd"
import style from "./style.module.css"


export default function CreateGroup({ IsGroupCreated, path }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState('')
    const [member, setMember] = useState([])
    const [allUsers, setAllUsers] = useState([])

    function MakeGroup() {
        fetch(`${path}/creategroup`, {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('jwt'),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, description, member })
        })
            .then(res => {
                return res.json()
                // if (res.ok)
                // else {
                //     throw new Error(res.json().message)
                //     return
                // }
            })
            .then(res => {
                message.success(res.message)
                console.log("Create Response: " + res.message)
                IsGroupCreated(res.group)
            })
            .catch(err => {
                message.error(err.message)
                console.log("Create Error: ", err)
            })
    }

    function SearchUser() {
        fetch(`http://localhost:3000/searchuser?search=` + users, {
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem('jwt'),
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res?.message) {
                    message.error(res.message)
                }
                if (res?.user) {
                    setAllUsers(res.user)
                }
                else {
                    setAllUsers([])
                }
            })
            .catch(err => {
                alert("An Error Occured")
            })
    }

    function AddMembers(newMember) {
        // if (!member.includes(newMember._id))
        setMember(p => {
            const idx = p.findIndex(i => i._id == newMember._id)
            if (idx >= 0)
                return p
            return [...p, newMember]
        })
    }

    function RemoveMembers(oldMember) {
        oldMember = member.filter(ele => ele != oldMember)
        setMember([oldMember])
    }

    return (
        <>
            <div className={style.group}>
                <label htmlFor="group_name" className={style.labels}>Group Name</label>
                <input type="text" name="group_name" placeholder="Group Name" className={style.fields} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={style.group}>
                <label htmlFor="group_description" className={style.labels}>Group Description</label>
                <textarea type="text" name="group_description" placeholder="Group Description" className={style.fields} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className={style.group}>
                <label htmlFor="add_members">Add Members</label>
                <input type="text" onChange={(e) => setUsers(e.target.value)} />
                <button type='button' onClick={() => SearchUser()}>Search</button>
            </div>
            <div className={style.selected_user}>
                {
                    member.map(ele => {
                        return (
                            <div className={style.selected_user}>
                                <p>{ele.name}</p>
                            </div>
                        )
                    }
                    )
                }
            </div>
            <div className={style.users_list}>
                {
                    allUsers.map(ele => {
                        return (
                            <div id={ele._id} className={style.user_card} onClick={() => AddMembers(ele)}>
                                <p>{ele.name}</p>
                                <p>{ele.mail}</p>
                            </div>
                        )
                    })
                }</div>
            <div>
                <button type="button" onClick={() => MakeGroup()}>Create</button>
            </div>
        </>
    )
}