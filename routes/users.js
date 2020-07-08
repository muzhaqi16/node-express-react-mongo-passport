const express = require('express');
const passport = require('passport')
const router = express.Router();
const User = require('../models').User;


// We are handling registration through passport js
router.post('/register', passport.authenticate('signup', { failureFlash: true, successRedirect: '/', successFlash: true }), function (req, res) {
  console.log(req)
  res.json("Registered succesfully")
});

// When the user tries to login, if succesful we redirect to home directory, if failed we show the error message
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/register',
  successFlash: true,
  failureFlash: true,
  failureMessage: "Unable to log in, check your email and password and try again"
}), (req, res) => {
  res.json(req.flash('error'))
})

// If you want to handle user registration manually instead of passport js

// router.post('/', function (req, res, next) {
//   const user = new User(req.body)
//   user.save((err, user) => {
//     if (err) {
//       console.log(err)
//       // Will error, but will *not* be a mongoose validation error, it will be
//       // a duplicate key error.
//       // See: https://masteringjs.io/tutorials/mongoose/e11000-duplicate-key
//       if (err.message.indexOf('duplicate key error') !== -1) {
//         err._message = "A user already exists with the email address that you provided. Try to login instead or use a different email address"
//       }
//       return res.json(err)
//     }
//     res.json(user);
//   });

// There are multiple methods that you can save to the database, this is another possible way of the same thing that we are doing
// User.create(req.body, (err, user) => {
//   if (err) { console.log(err); res.json({ "message": "There was an error" }) }
//   res.json(user);
// })
// })

module.exports = router;
