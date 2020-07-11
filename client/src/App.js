import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import API from './utils/API.js';

import './App.css';

import { Home, Login, Register } from './pages';
import { Button } from './components/Input';
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
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/">
						<Home user={user} />
					</Route>
				</Switch>
			</Router>
		</div >
	);
}

export default App;
