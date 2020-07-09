import React, { useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../Api';
import './style.css';
import { Button, Input } from '../../components/Input';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        api.Register(email, password, firstName, lastName)
    }
    return (
        <div className="register-page">
            <div className="form">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <Input type="text" placeholder="first name" value={firstName} onChange={e => setfirstName(e.target.value)} />
                    <Input type="text" placeholder="last name" value={lastName} onChange={e => setlastName(e.target.value)} />
                    <Input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Input type="text" placeholder="email address" value={email} onChange={e => setEmail(e.target.value)} />
                    <Button>create</Button>
                    <p className="message">Already registered? <Link to="login">Sign In</Link></p>
                </form>
            </div>

        </div>
    )
}

export default Register;
