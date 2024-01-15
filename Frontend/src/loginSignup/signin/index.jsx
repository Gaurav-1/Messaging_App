import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import UserAuthContext from "../../../context/userAuthContext"


import style from "./style.module.css";
// import { path } from "../../../constants/global"

export default function Signin() {
  // const { user, setUser } = React.useContext(UserAuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(sessionStorage.getItem('user')?.isLoggedin);
  const [url, setUrl] = useState(sessionStorage.getItem('user')?.fallback);

  //setLogin(false);
  function Login() {
    // setLogin(false);
    if (email.trim() == "" || password.trim() == "") {
      alert("Email and password is required")
      return;
    }
    if (password.length < 8) {
      alert("Minimum password length is 8")
      return;
    }



    fetch(`${path}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then(res => {
        console.log("Response from ", res);
        if(res.token){
          localStorage.setItem("jwt",JSON.stringify(res.token))
        }
        if (res.url) {
          console.log(res.url);
          // setUser({ isLoggedin: true, userRole: res.userObj.userRole, userName: res.userObj.userName, fallback: res.url })
          // sessionStorage.setItem('user', JSON.stringify({ ...res.userObj, isLoggedin: true, fallback: res.url }))
          setUrl(res.url)
          setLogin(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // useEffect(() => {
  //   console.log('URL CHNAGED', url);
  //   console.log('IS Logged IN', login);
  // }, [url]);

  return (

    (login) ? <><Navigate to={url} /></>: (
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.top}>
            <h2>Welcome Back</h2>
          </div>
          <div className={style.middle}>
            <div className={style.labels}>
              <label htmlFor='email'>Username</label>
              <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={style.labels}>
              <label htmlFor='password'>Password</label>
              <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className={style.bottom}>
            <button type="button" className={style.signinBtn} onClick={(e) => Login()} >Sign In</button>
            <p>Don't have account? <Link to="/signup">Signup</Link></p>
            <p><Link to="/forgetPassword">Forget Password? </Link></p>
          </div>
        </div>
      </div>)
  );
}
