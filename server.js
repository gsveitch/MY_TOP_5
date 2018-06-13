// APP REQUIREMENTS
require('dotenv').config();
const express = require('express');
const session = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./passportSetup');
const GoogleStrategy = require('passport-google-oauth20');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
var db = require('./database.js');

//ROUTES
app.use(express.static('client'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
//Passport

passportSetup(app);

app.get('/shelf', function (req, res) {
    db.selectAll(function (err, data) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(data);
        }
    });
});

app.post('/shelf', function (req, res) {
    //console.log(req.body);
    db.add(req.body.params.movie, function (err, res) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.end("movie on the shelf!");
        }
    });
});

app.delete("/shelf", function (req, res) {
    console.log(req.body);
    db.remove(req.body.movieId, function (err) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.end("that was rotten anyways!");
        }
    });
});

app.get('/auth', (req, res) => res.send({
    user: req.user || null
}));

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile'],
}));

app.get('/auth/google/redirect', (req, res) => {
    res.send('Gotcha boy');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//NOW LISTEN
app.listen(PORT, (err) => {
    console.log(err || `listening on port ${PORT}`);
});

module.exports.app = app;
