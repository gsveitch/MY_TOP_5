// MONGOOSE REQUIREMENTS
var mongoose = require('mongoose');
const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI, { useMongoClient: true })

//MONGOOSE SETUP
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`connected to mongoose at ${MONGO_URI}`);
});

var movieSchema = mongoose.Schema({
  title: String,
  director: String,
  year: String,
  art: String,
  url: String,
  trailer: String,
  longDescription: String,
  comments: Array,
});

var Movie = mongoose.model('Movie', movieSchema);

const userSchema = mongoose.Schema({
  username: String,
  googleId: String,
});

const User = mongoose.model('User', userSchema);

var selectAll = function (callback) {
  Movie.find({}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var add = function (movie, callback) {
  console.log('movie saved!', JSON.stringify(movie.trackName));
  let newMovie = new Movie({
    title: movie.trackName,
    director: movie.artistName,
    year: movie.releaseDate.slice(0, 4),
    art: movie.artworkUrl100,
    url: movie.trackViewUrl,
    trailer: movie.previewUrl,
    longDescription: movie.longDescription,
    comments: []
  });
  newMovie.save();
};

var remove = function (movieId, callback) {
  Movie.findByIdAndRemove(movieId, (err, movie) => {

    callback(movie);
  });
}

var update = function (movieId, callback) {
  Movie.findById(movieId, (err, movie) => {
    if (err) {
      console.log(err);
    } else {
      movie.comments.push('WOW');
    }
    callback(movie);
  });
}
module.exports.remove = remove;
module.exports.selectAll = selectAll;
module.exports.add = add;
module.exports.User = User;