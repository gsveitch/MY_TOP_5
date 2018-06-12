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

const movieSchema = mongoose.Schema({
  movieId: Number,
  favorites: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [{
      message: String,
      userId: Number,
    }],
    default: [],
  },
});

var Movie = mongoose.model('Movie', movieSchema);

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

const addReview = (movieId, review) => {
  return Movie.findOne({ movieId: movieId })
    .exec()
    .then(movie => movie || Promise.reject(new Error(`No movie found with movieId: ${movieId}`)))
    .then((movie) => {
      movie.reviews.push(review)
      return movie.save();
    })
};

module.exports.remove = remove;
module.exports.selectAll = selectAll;
module.exports.add = add;
module.exports.addReview = addReview;

module.exports.Movie = Movie;
