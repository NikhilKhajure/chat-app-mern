import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./pages.css"
import axios from 'axios';
import { registerRoute } from '../utils/APIROUTES.JS';
function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    })
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const toasOpt = {
        position: "bottom-right",
        autoClose: "8000",
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };
    const handleValidation = () => {
        const { username, email, password, confirmpassword } = values;
        if (password != confirmpassword) {
            toast.error("password and confirm password should be same", toasOpt)
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 character", toasOpt)
            return false;
        } else if (email == "") {
            toast.error("Email must be given", toasOpt);
            return false;
        }
        return true;
    }
    const handleForm = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, email, password, confirmpassword } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toasOpt);
            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.newUser))
                navigate("/setavatar")
            }
        }
    };
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, [])
    return (
        <>
            <div className='registerContainer'>
                <form onSubmit={handleForm}>
                    <div className="brand">
                        <img src={logo} alt="" />
                        <h1>Snappy</h1>
                    </div>
                    <input type="text" name="username" onChange={(e) => handleChange(e)} placeholder='Username' />
                    <input type="email" name="email" onChange={(e) => handleChange(e)} placeholder='Email' />
                    <input type="password" name="password" onChange={(e) => handleChange(e)} placeholder='Password' />
                    <input type="password" name="confirmpassword" onChange={(e) => handleChange(e)} placeholder='Confirm Password' />
                    <button type='submit'>Create User</button>
                    <span>Already a User <Link to="/login">Login</Link></span>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}
export default Register;
