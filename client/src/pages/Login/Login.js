import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './style.css'
import { Button, Input } from '../../components/Input';
import api from '../../Api';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        api.Login(email, password)
    }
    return (
        <div className="login-page">
            <div className="form">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <Input name="email" type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input name="password" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Button>login</Button>
                    <p className="message">Not registered? <Link to="register">Create an account</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login
