const express = require('express');
const router = express.Router();
const User = require('../models').User;

/* GET all users listing. */
router.get('/', function (req, res, next) {
  User.find({}, (err, users) => {
    if (err) { console.log(err) }
    res.json(users);
  })
});

// POST register a user
router.post('/', function (req, res, next) {
  User.create(req.body, (err, user) => {
    if (err) { console.log(err); res.json({ "message": "There was an error" }) }
    res.json(user);
  })
})

module.exports = router;
