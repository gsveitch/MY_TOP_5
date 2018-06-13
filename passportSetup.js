const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { User } = require('./database');
const app = require('./server');





// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializedUser((id, done) => {
//   User.findById(id)
//   .then(user => done(null, user))
//   .catch(error => done(error));
// });

passport.use(new GoogleStrategy({
    callbackURL: "/auth/google/redirect",
    clientID: process.env.ClientID,
    clientSecret: process.env.Secret,
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

// app.get('/auth', (req, res) => res.send({
//   user: req.user || null
// }));

// app.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile'],
// }));

// app.get('/auth/google/redirect', passport.authenticate('google', {
//   successRedirect: '/',
//   failureRedirect: '/fail',
// }));

// app.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/login');
// })


