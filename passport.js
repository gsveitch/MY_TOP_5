const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('cookie-session');
const { User } = require('database');
const app = require('server');

const cookie = {
  secret: process.env.Cookie,
  cookie: {
    maxAge: 86400000, // 1 day
  }
}

app.use(session(cookie));
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/', (req, res) => res.send({
  user: req.user || null
}));

app.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

app.get('/google/redirect', passport.authenticate('google', {
  successRedirect: '/create_game',
  failureRedirect: '/play',
}));




