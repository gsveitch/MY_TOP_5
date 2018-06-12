const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('cookie-session');
const { User } = require('database')

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializedUser((id, done) => {
  User.findById(id)
  .then(user => done(null, user))
  .catch(error => done(error));
});

passport.use(new GoogleStrategy({
    consumerKey: proccess.env.Client_ID,
    consumerSecret: process.env.Secret,
    callbackURL: "/auth/google/redirect"
  },
  function (token, tokenSecret, profile, done) {
    User.findOne({
      googleId: profile.id
    })
      .then(currentUser => currentUser || new User({
          username: profile.displayName,
          googleId: profile.id,
        }).save())
        .then(user => done(null, user))
        .catch(error => done(error));
  }
));

app.get('/auth/google',
    passport.authenticate('google', {
      scope: 'https://www.google.com/m8/feeds' 
    }));


