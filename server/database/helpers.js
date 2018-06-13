const { Movie } = require('./');

const getAllMovies = () => Movie.find().exec();
const createMovie = ({ movvieId }) => {
  const newMovie = new Movie({ movieId });
  return newMovie.save();
};
const removeMovie = movieId => Movie.findOneAndRemove({ movieId }).exec();

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

module.exports.getAllMovies = getAllMovies;
module.exports.createMovie = createMovie;
module.exports.removeMovie = removeMovie;
module.exports.addReview = addReview;
