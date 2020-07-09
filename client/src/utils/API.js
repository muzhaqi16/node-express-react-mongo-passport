const axios = require('axios');

const Login = (email, password) => {
    axios.post('http://localhost:3001/users/login', {
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
const Register = (email, password, firstName, lastName) => {
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
    Login, Register
}