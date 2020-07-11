import React from 'react'
import {
    Link
} from 'react-router-dom';
import { Button } from '../../components/Input';
import './Home.css';
function Home(props) {
    return (
        <div className="home-container">
            <h1>Welcome home!</h1>
            {!props.user && <Link to="/login"><Button>Login</Button></Link>}
        </div>
    )
}

export default Home;
