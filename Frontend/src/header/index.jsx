import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"

import style from './style.module.css'

export default function Header() {
    const [Current_User, setCurrentUser] = useState(localStorage.getItem('Current_User'))

    return (
        <div className={style.header}>
            <div className={style.nav}>
                <div className={style.logo}>
                    <h2>Chatting</h2>
                </div>
                <div className={style.links}>
                    <ul className={style.nav_list}>
                        <li className={style.nav_items} >{(Current_User) ? <><span id={style.userName}>{Current_User}</span> <Link to="/signout" >, Sign Out</Link></> : null} </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}