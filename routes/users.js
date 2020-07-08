const express = require('express');
const passport = require('passport')
const router = express.Router();
const User = require('../models').User;

router.post('/register', passport.authenticate('signup', { failureFlash: true, successRedirect: '/', successFlash: true }), function (req, res) {
  console.log(req)
  res.json("Registered succesfully")
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/register',
  successFlash: true,
  failureFlash: true,
  failureMessage: "Unable to log in, check your email and password and try again"
}), (req, res) => {
  res.json(req.flash('error'))
})

module.exports = router;
