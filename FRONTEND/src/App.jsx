import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import Setavatar from './pages/Setavatar'
// import Setavatar from './pages/Setavatar'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Chat />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/setavatar' element={<Setavatar />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
