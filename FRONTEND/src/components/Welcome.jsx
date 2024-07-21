import React from 'react'
import robot from '../assets/robot.gif';
import './compo.css';
function Welcome({ currentUser }) {
    return (
        <div className='welcome'>
            <img src={robot} alt="Welcome Image" />
            <h1>Welcome! {currentUser === undefined ? <h1>User</h1> : currentUser.username} </h1>
            <h2>Please Select a chat to start messaging</h2>
        </div>
    )
}

export default Welcome
