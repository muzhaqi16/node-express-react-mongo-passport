const axios = require('axios');

const logout = () => {
    axios('http://localhost:3001/users/logout')
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        })
}
const login = (email, password) => {
    axios.post('http://localhost:3001/users/login', {
        email,
        password
    })
        .then(function (response) {
            console.log(response)
            // handle success
            // if (response.status === 200) {
            //     window.location.href = '/'
            // }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
const loginWithErrorMessage = (email, password) => {
    axios.post('http://localhost:3001/users/loginWithErrorMessage', {
        email,
        password
    })
        .then(function (response) {
            // handle success
            if (response.status === 200) {
                window.location.href = '/'
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
const register = (email, password, firstName, lastName) => {
    axios.post('http://localhost:3001/users/register', {
        email,
        password,
        firstName,
        lastName
    })
        .then(function (response) {
            // handle success
            if (response.status === 200) {
                window.location.href = '/'
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