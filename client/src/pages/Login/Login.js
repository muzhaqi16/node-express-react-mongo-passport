import React from 'react'
import { Link } from "react-router-dom";
import './style.css'
import { Button, Input } from '../../components/Input';

function Login() {
    return (
        <div className="login-page">
            <div className="form">
                <h2>Login</h2>
                <form className="login-form">
                    <Input type="text" placeholder="username" />
                    <Input type="password" placeholder="password" />
                    <Button>login</Button>
                    <p className="message">Not registered? <Link to="register">Create an account</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login
