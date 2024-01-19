import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { message } from "antd"
// import {BorderBottomOutlined} from "@ant-design/icons"
// import {notification,Space,Divider,Button} from "antd"
// import {NotificationArgsProps} from "antd"

// import UserAuthContext from "../../../context/userAuthContext"

import style from "./style.module.css";


export default function Signin() {
  // const { user, setUser } = React.useContext(UserAuthContext)
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [url, setUrl] = useState('');

  function Login() {
    if (mail.trim() == "" || password.trim() == "") {
      alert("Email and password is required")
      return;
    }
    if (password.length < 8) {
      alert("Minimum password length is 8")
      return;
    }

    fetch(`http://localhost:3000/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ mail: mail, password: password }),
    })
      .then((res) => res.json())
      .then(res => {
        (res?.message) ? message.info(res.message) : null;
        if (res?.token) {
          localStorage.setItem("jwt", res.token)
          localStorage.setItem("Current_User", res.currentUser)
          setUrl('/dashboard')
          setLogin(true)
          // setUser({ isLoggedin: true, userRole: res.userObj.userRole, userName: res.userObj.userName, fallback: res.url })
          // sessionStorage.setItem('user', JSON.stringify({ ...res.userObj, isLoggedin: true, fallback: res.url }))
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    localStorage.getItem('jwt') ? (
      fetch('http://localhost:3000/jwtLogin', {
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
            localStorage.removeItem('jwt')
          }
          if (res?.token) {
            localStorage.setItem("jwt", res.token)
            localStorage.setItem("Current_User", res.currentUser)
            setUrl('/dashboard')
            setLogin(true)
          }
        })
        .catch(err => {
          message.error(err.message)
          console.log(err)
          localStorage.removeItem('jwt')
        })
    ) : null
  }, [])

  return (

    (login) ? <><Navigate to={url} /></> : (
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.top}>
            <h2>Welcome Back</h2>
          </div>
          <div className={style.middle}>
            <div className={style.labels}>
              <label htmlFor='email'>Username</label>
              <input type="email" name="email" placeholder="Email" onChange={(e) => setMail(e.target.value)} />
            </div>
            <div className={style.labels}>
              <label htmlFor='password'>Password</label>
              <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className={style.bottom}>
            <button type="button" className={style.signinBtn} onClick={(e) => Login()} >Sign In</button>
            <p>Don't have account? <Link to="/signup">Signup</Link></p>
          </div>
        </div>
      </div>
    )
  );
}
