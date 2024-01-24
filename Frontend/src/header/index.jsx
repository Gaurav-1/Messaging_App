import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"

import style from './style.module.css'

export default function Header() {
    const [Current_User, setCurrentUser] = useState('')

    return (
        <div className={style.header}>
            <div className={style.nav}>
                <div className={style.logo}>
                    <h2>Chatting</h2>
                </div>
                <div className={style.links}>
                    <ul className={style.nav_list}>
                        {(Current_User) ? <li className={style.nav_items} >{(Current_User) ? <><span id={style.userName}>{Current_User}</span> <Link to="/signout" >, Sign Out</Link></> : null} </li> : null}
                    </ul>
                </div>
            </div>
        </div>
    )
}