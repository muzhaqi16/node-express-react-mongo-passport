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
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) {
      console.log(err)
      // Will error, but will *not* be a mongoose validation error, it will be
      // a duplicate key error.
      // See: https://masteringjs.io/tutorials/mongoose/e11000-duplicate-key
      if (err.message.indexOf('duplicate key error') !== -1) {
        err._message = "A user already exists with the email address that you provided. Try to login instead or use a different email address"
      }
      return res.json(err)
    }
    res.json(user);
  });

  // There are multiple methods that you can save to the database, this is another possible way of the same thing that we are doing
  // User.create(req.body, (err, user) => {
  //   if (err) { console.log(err); res.json({ "message": "There was an error" }) }
  //   res.json(user);
  // })
})

module.exports = router;
