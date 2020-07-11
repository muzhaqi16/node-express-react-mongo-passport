const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res) {
	res.json({ title: 'Welcome to Express' });
});

router.get('/private', passport.authenticate('local'), (req, res) => {
	res.status(200).json({
		success: `logged in as ${req.user.email}`
	});
});

module.exports = router;
