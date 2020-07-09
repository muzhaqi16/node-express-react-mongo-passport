const express = require('express');
const passport = require('passport')
const router = express.Router();

router.post('/register', passport.authenticate('signup'), function (req, res) {
  console.log(req)
  res.json({ messsage: "Registered succesfully" })
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ messsage: "login was succesfull" })
})

module.exports = router;
