import React from 'react';
import { Link } from "react-router-dom";
import './style.css';
import { Button, Input } from '../../components/Input';

function Register() {
    return (
        <div className="register-page">
            <div className="form">
                <h2>Register</h2>
                <form className="register-form">
                    <Input type="text" placeholder="name" />
                    <Input type="password" placeholder="password" />
                    <Input type="text" placeholder="email address" />
                    <Button>create</Button>
                    <p className="message">Already registered? <Link to="login">Sign In</Link></p>
                </form>
            </div>

        </div>
    )
}

export default Register;
