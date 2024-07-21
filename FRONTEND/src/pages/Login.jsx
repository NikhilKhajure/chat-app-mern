import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./pages.css"
import axios from 'axios';
import { loginRoute } from '../utils/APIROUTES.JS';
function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
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
        const { username, password } = values;
        if (password === "") {
            toast.error("password Must be provided", toasOpt)
            return false;
        } else if (username === "") {
            toast.error("Username should be greater than 3 character", toasOpt)
            return false;
        }
        return true;
    }
    const handleForm = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toasOpt);
            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.newUser))
                navigate("/")
            }
        }
    };
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, []);
    return (
        <>
            <div className='registerContainer'>
                <form onSubmit={handleForm}>
                    <div className="brand">
                        <img src={logo} alt="" />
                        <h1>Snappy</h1>
                    </div>
                    <input type="text" name="username" onChange={(e) => handleChange(e)} placeholder='Username' />

                    <input type="password" name="password" onChange={(e) => handleChange(e)} placeholder='Password' />

                    <button type='submit'>Login In</button>
                    <span>Don't Have An Account<Link to="/register">Register</Link></span>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}
export default Login;
