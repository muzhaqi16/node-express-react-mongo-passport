const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models").User;

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use('local', new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    // Match User, When a user tries to sign in this code runs
    User.findOne({
      email: email
    }).then(function (user, err) {
      // if there was an error return
      if (err) { return done(err); }

      // If there's no user with the given email
      if (!user) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Wrong password" });
          }
        });
      }
    }).catch(err => {
      return done(null, false, { message: err });
    });
  }
));
passport.use(
  'signup',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const checkEmail = await User.checkExistingField('email', email);
      if (checkEmail) {
        return done(null, false, {
          statusCode: 409,
          message: 'Email already registered, log in instead',
        });
      }
      // Create new user
      const newUser = new User({ email, password, firstName: req.body.firstName, lastName: req.body.lastName });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              console.log("User create")
              return done(null, user);
            })
            .catch(err => {
              console.log(err)
              return done(null, false, { message: err });
            });
        });
      });
    } catch (err) {
      return done(null, false, { statusCode: 400, message: err.message });
    }
  }),
);
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

// Exporting our configured passport
module.exports = passport;
