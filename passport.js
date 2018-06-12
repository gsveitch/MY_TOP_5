const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

passport.use(new GoogleStrategy({
    consumerKey: proccess.env.Client_ID,
    consumerSecret: process.env.Secret,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function (token, tokenSecret, profile, done) {
    User.findOrCreate({
      googleId: profile.id
    }, function (err, user) {
      return done(err, user);
    });
  }
));