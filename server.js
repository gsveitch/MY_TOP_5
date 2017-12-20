// APP REQUIREMENTS
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

// MONGOOSE REQUIREMENTS
const { MONGO_URI } = process.env;
const mongoose = require('mongoose');
mongoose.connect(MONGO_URI, {useMongoClient: true});

//MONGOOSE SETUP
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`connected to mongoose at ${MONGO_URI}`);
});

//ROUTES
app.use(express.static('client'));

app.post('/movies', (req, res) => {
    console.log('ROUTE HIT ! gimmie some itunes movies')
})

//NOW LISTEN
app.listen(PORT, (err) => {
    console.log(err || `listening on port ${PORT}`);
});

