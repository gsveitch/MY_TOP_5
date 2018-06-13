const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { User } = require('./database');
const app = require('./server');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => done(null, user))
  .catch(error => done(error));
});

passport.use(new GoogleStrategy({
    callbackURL: "/auth/google/redirect",
    clientID: process.env.ClientID,
    clientSecret: process.env.Secret,
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('I did it');
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser){
        done(null, currentUser);
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }
    })
  }));
