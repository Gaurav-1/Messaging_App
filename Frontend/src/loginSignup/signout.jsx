import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Signout() {
    const [isLogout, setIsLogout] = useState(false);

    function Logout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("Current_User");
        setIsLogout(true);
    }
    useEffect(() => {
        Logout();
    }, []);
    if (isLogout)
        return <Navigate to="/" />
}
