import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {message} from "antd"

import style from "./style.module.css";

export default function Signin() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [region, setRegion] = useState('INDIA');
  const [signuped, setSignuped] = useState(false);
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');

  function signup() {
    if (name.trim() == "") { alert("Name is required"); return; }
    else if (mail.trim() == "") { alert("Email is required"); return; }
    else if (password !== confirmPassword || password.trim() == "") {
      alert("Password doesn't matched");
      return;
    }
    console.log({name: name, mail: mail, password: password, region: region});
    fetch(`http://localhost:3000/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: name, mail: mail, password: password, region: region }),
    })
      .then((res) => res.json())
      .then(res => {
        setMsg(res.message)
        setUrl("/")
        setSignuped(true);
      })
      .catch((err) => {
        alert(err.message)
      });
  }

  return (
    (signuped) ? <> {alert(msg)} <Navigate to={url} /> </> : (
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.top}>
            <h2>Sign Up</h2>
          </div>
          <div className={style.middle}>
            <div className={style.labels}>
              <label>Name</label>
              <input type="text" className={style.labels_input} name="username" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className={style.labels}>
              <label>Email</label>
              <input type="email" className={style.labels_input} name="useremail" placeholder="Email" onChange={(e) => setMail(e.target.value)} />
            </div>

            <div className={style.labels}>
              <label>Password</label>
              <input type="password" className={style.labels_input} name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className={style.labels}>
              <label>Confirm Password</label>
              <input type="password" className={style.labels_input} name="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            
            <div className={style.labels}>
              <label>Region</label>
              <select name="region" onChange={(e)=>setRegion(e.target.value)}>
                <option value="INDIA">INDIA</option>
                <option value="JAPAN">JAPAN</option>
                <option value="AMERICA">AMERICA</option>
              </select>
            </div>
          </div>

          <div className={style.bottom}>
            <button type="button" className={style.signinBtn} onClick={(e) => signup()}>Sign Up</button>
            <p>Already have account? <Link to="/" >Sign in</Link></p>
          </div>
        </div>
      </div>
    )
  );
}
