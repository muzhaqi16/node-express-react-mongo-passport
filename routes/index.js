const express = require('express');
const router = express.Router();
const passport = require('passport')
router.get('/', function (req, res, next) {
  res.json({ title: 'Welcome to Express' });
});

router.get('/private', passport.authenticate('local', { failureRedirect: '/users/login', successFlash: true, failureFlash: true, }), (req, res) => {
  res.status(200).json({
    success: `logged in as ${req.user.email}`
  });
})

module.exports = router;
