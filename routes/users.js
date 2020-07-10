const express = require('express');
const passport = require('passport')

const router = express.Router();

router.post('/register', passport.authenticate('signup'), function (req, res) {
  res.json({ messsage: "Registered succesfully" })
});
// This one doesn't display any error messages if the login wasn't succesfull
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ messsage: "login was succesfull" })
})

// http://www.passportjs.org/docs/logout/
router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).end()
});

// If you want to display error message when login fails, like user doesn't exist, wrong email, password etc.
router.post('/loginWithErrorMessage', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).send(info)
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.json(user);
    });
  })(req, res, next);
})

module.exports = router;
