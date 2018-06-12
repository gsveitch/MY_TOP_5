// APP REQUIREMENTS
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const { PORT, MOVIEDB } = process.env;
var db = require('../database.js');

//ROUTES
app.use(express.static('client'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());

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

app.post('/search', (req, res) => {
    const { query } = req.body;
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB}&query=` + query)
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
})

app.post('/searchVideo', (req, res) => {
    const { id } = req.body;
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${MOVIEDB}`)
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

//NOW LISTEN
app.listen(PORT, (err) => {
    console.log(err || `listening on port ${PORT}`);
});

