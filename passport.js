const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('cookie-session');



passport.use(new GoogleStrategy({
    consumerKey: proccess.env.Client_ID,
    consumerSecret: process.env.Secret,
    callbackURL: "http://localhost:8080/auth/google/redirect"
  },
  function (token, tokenSecret, profile, done) {
    User.findOrCreate({
      googleId: profile.id
    }, function (err, user) {
      return done(err, user);
    });
  }
));

app.get('/auth/google',
    passport.authenticate('google', {
      scope: 'https://www.google.com/m8/feeds' 
    }));


