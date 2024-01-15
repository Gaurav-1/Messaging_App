import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { path } from "../../constants/global";

import UserAuthContext from "../../context/userAuthContext";

export default function Signout(){
    const [responseMessage, setMessage] = useState('')
    const {user,setUser} = React.useContext(UserAuthContext)
    const defaultUser = {
        isLoggedin: false,
        userRole: 'guest',
        userName: 'Guest',
        fallback: '/signin',
        userMail: null,
        isVerified: null,
    }

    function Logout(){
        fetch(`${path}/user/logout`,{
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((res)=>{
            setMessage(res.message)
            sessionStorage.setItem('user',JSON.stringify(defaultUser));
            setUser(defaultUser)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    useEffect(()=>{Logout()},[])
    if(responseMessage)
        return(
            <>
                <Navigate to='/' />
            </>
        )
}