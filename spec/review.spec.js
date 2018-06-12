require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');

const { Movie } = require('../database');

const { PORT } = process.env;
const endpoint = `http://localhost:${PORT}/review`;

describe('review', () => {
  let movieId = 4343;
  let movie;

  beforeEach((done) => {
    new Movie({ movieId })
      .save()
      .then(() => done());
  });

  afterEach((done) => {
    Movie.findOneAndRemove({ movieId })
      .exec()
      .then(() => done())
  });

  it('post to /review creates a review', (done) => {
    const review = { message: 'This movie sucked!', userId: 3434 };

    axios.post(endpoint, { movieId, ...review })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data.error).to.be.null;
        expect(response.data.data).to.exist;
      })
      .then(() => Movie.findOne({ movieId }))
      .then((updatedMovie) => {
        const newReview = updatedMovie.reviews[0];

        expect(newReview).to.exist;
        expect(newReview.message).to.equal(review.message);
        expect(newReview.userId).to.equal(review.userId);

        done();
      });
  });
});
