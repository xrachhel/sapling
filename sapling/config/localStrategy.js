const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Use Passport.js for local authentication.
passport.use(
  new LocalStrategy(
    {
      emailField: "email",
      passwordField: "password"
    },

    function(email, password, done) {
      User.findOne({ username: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// module.exports = strategy;
