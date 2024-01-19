import { Navigate } from "react-router-dom"
import React from "react"


import Login from "../loginSignup/signin"
import Signup from "../loginSignup/signup"
import Dashboard from "../dashboard"


const AllRoutes = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: 'signup',
        element: <Signup />
    },
    {
        path: 'dashboard',
        element: <Dashboard/>
    }
]

export { AllRoutes }