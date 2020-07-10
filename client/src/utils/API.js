const axios = require('axios');
const url = process.env.REACT_APP_API_URL;
const logout = () => {
    axios(`${url}/users/logout`)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        })
}
const login = (email, password) => {
    axios.post(`${url}/users/login`, {
        email,
        password
    })
        .then(function (response) {
            if (response.status === 200) {
                window.location.href = '/'
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
const loginWithErrorMessage = (email, password) => {
    axios.post(`${url}/users/loginWithErrorMessage`, {
        email,
        password
    })
        .then((response) => {
            // handle success
            if (response.status === 200) {
                window.location.href = '/'
            }
        })
        .catch(function (error) {
            // handle error
            console.log("This is the error", error);
        })
}
const register = (email, password, firstName, lastName) => {
    axios.post(`${url}/users/register`, {
        email,
        password,
        firstName,
        lastName
    })
        .then(function (response) {
            // handle success
            if (response.status === 200) {
                window.location.href = '/login'
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
export default {
    login, register, loginWithErrorMessage, logout
}