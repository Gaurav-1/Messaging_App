import { useState } from 'react'
import Login from "./loginSignup/signin"
import './App.css'
import { Outlet } from 'react-router-dom'

import Header from "./header"

function App() {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
