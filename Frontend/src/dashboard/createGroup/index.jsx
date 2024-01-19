import { useState } from "react"
import { message } from "antd"
import style from "./style.module.css"


export default function CreateGroup({ IsGroupCreated }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [member, setMember] = useState('')
    const [users, setUsers] = useState('')
    const [allUsers, setAllUsers] = useState([])

    function MakeGroup() {
        console.log(localStorage.getItem('jwt'));
        fetch('http://localhost:3000/creategroup', {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('jwt'),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, description, member })
        })
            .then(res => {
                if (res.ok)
                    return res.json()
                else {
                    message.error(res.json().message)
                    return
                }
            })
            .then(res => {
                message.success(res.message)
                console.log("Create Response: " + res.message)  
                IsGroupCreated(res.group)
            })
            .catch(err => {
                console.log("Create Error: ", err.message)
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
        if (!member.includes(newMember))
            setMember([...member, newMember])
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
            <div className={style.selected_users}>
                {
                    // member.filter(ele=>{
                    //     if (ele == allUsers.includes(ele)) {
                    //         console.log(ele._id);
                    //         return (<>
                    //             <div className={style.selected_users_card} onClick={() => RemoveMembers(ele._id)}>{ele.name}</div>
                    //         </>
                    //         )
                    //     }})

                    //  member.forEach(ele => {

                    // })

                }
            </div>
            <div className={style.users_list}>
                {allUsers.map(ele => {
                    return (
                        <>
                            <div id={ele._id} className={style.user_card} onClick={() => AddMembers(ele._id)}>
                                <p>{ele.name}</p>
                                <p>{ele.mail}</p>
                            </div>
                        </>
                    )
                })}</div>
            <div>
                <button type="button" onClick={() => MakeGroup()}>Create</button>
            </div>
        </>
    )
}