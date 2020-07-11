import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route, Link
} from 'react-router-dom';
import API from './utils/API.js';

import './App.css';

import { Login, Register } from './pages.js';
import { Button } from './components/Input.js';
function App() {
	const [user, setUser] = useState();
	const getUser = async () => {
		let user = await JSON.parse(localStorage.getItem('user'));
		setUser(user);
	};
	useEffect(() => {
		getUser();
	}, []);
	return (
		<div className="main-container">
			{user && <Button onClick={() => { API.logout(); setUser(); }}>Log Out {user.firstName}</Button>}
			<Router>
				{!user && <Link to="/login"><Button>Login</Button></Link>}
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/">
						{/* <Home /> */}
					</Route>
				</Switch>
			</Router>
		</div >
	);
}

export default App;
