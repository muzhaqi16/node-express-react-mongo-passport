const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models").User;

passport.use('local', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    console.log(req.body)
    User.findOne({
      email: email
    }).then(function (user, err) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
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
      const newUser = new User({ email, password, firstName: req.body.firstName, lastName: req.body.lastName });
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
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});
module.exports = passport;
