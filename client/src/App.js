import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import API from './utils/API';

import './style.css'

import { Login, Register } from './pages'
import { Button } from './components/Input';
function App() {
  return (
    <div className="main-container">
      <Button onClick={() => API.logout()}>Log Out</Button>
      <Router>
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
    </div>
  );
}

export default App;
