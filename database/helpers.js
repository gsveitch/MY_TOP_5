const { Movie } = require('./');

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
      const userAlreadyReviewed = !!movie.reviews.find(oldReview => oldReview.userId === review.userId);

      if (userAlreadyReviewed) {
        return Promise.reject(new Error('User has already reviewed movie'));
      } else {
        movie.reviews.push(review);
        return movie.save();
      }
    });
};

module.exports.remove = remove;
module.exports.selectAll = selectAll;
module.exports.add = add;
module.exports.addReview = addReview;
