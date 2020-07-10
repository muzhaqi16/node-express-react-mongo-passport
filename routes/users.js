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

// http://www.passportjs.org/docs/logout/
router.get('/logout', function (req, res) {
  req.logout();
  res.sendStatus(200);
});

router.post('/loginWithErrorMessage', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.json(user);
    });
  })(req, res, next);
})

module.exports = router;
