const express = require('express');
const router = express.Router();
const passport = require('passport')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Welcome to Express' });
});

// Sample private route, if the user is logged in we display the content if not we redirect to login
router.get('/private', passport.authenticate('local', { failureRedirect: '/users/login', successFlash: true, failureFlash: true, }), (req, res) => {
  res.status(200).json({
    success: `logged in as ${req.user.email}`
  });
})

module.exports = router;
