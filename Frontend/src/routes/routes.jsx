import { Navigate } from "react-router-dom"
import React from "react"


import Login from "../loginSignup/signin"
import Signup from "../loginSignup/signup"
import Signout from "../loginSignup/signout"
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
        path: 'signout',
        element: <Signout />
    },
    {
        path: 'dashboard',
        element: <Dashboard/>
    },
    {
        path: '*',
        element: <h1>Not Found</h1>
    }
]

export { AllRoutes }