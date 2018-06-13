require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');

const { Movie } = require('../database');

const { PORT } = process.env;
const endpoint = `http://localhost:${PORT}/movies`;

describe('movies', () => {
  const movieId = 4545;

  beforeEach((done) => {
    new Movie({ movieId })
      .save()
      .then(() => done());
  });

  afterEach((done) => {
    Movie.findOneAndRemove({ movieId })
      .exec()
      .then(() => done());
  });

  describe('on get', () => {
    it('returns all the movies', (done) => {
      axios.get(endpoint)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.error).to.be.null;
          expect(response.data.data).to.be.an('array');
          expect(response.data.data[0].movieId).to.equal(movieId);

          done();
        });
    });

    it('return specific movie if given movieId param', (done) => {
      axios.get(`${endpoint}?movieId=${movieId}`)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.error).to.be.null;
          expect(response.data.data).to.be.an('object');
          expect(response.data.data.movieId).to.equal(movieId);

          done();
        });
    });

    it('returns an error when cannot find a movie with movieId', (done) => {
      axios.get(`${endpoint}?movieId=222222`)
        .catch((error) => {
          expect(error).to.exist;
          expect(error.response.status).to.equal(500);
          expect(error.response.data.error).to.be.a('string');

          done();
        });
    });
  });

  describe('on post', () => {
    let payload = { movieId: 121212 };

    afterEach((done) => {
      Movie.findOneAndRemove({ movieId: payload.movieId })
        .exec()
        .then(() => done());
    });

    it('creates a new movie', (done) => {
      axios.post(endpoint, payload)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.data).to.be.an('object');
          expect(response.data.data.movieId).to.equal(payload.movieId);

          Movie.findOne({ movieId: payload.movieId })
            .exec()
            .then((movie) => {
              expect(movie).to.exist;
              expect(movie.movieId).to.equal(payload.movieId);
            });

          done();
        });
    });

    it('returns an error when not given movieId', (done) => {
      payload.movieId = undefined;
      axios.post(endpoint, payload)
        .catch((error) => {
          expect(error).to.exist;
          expect(error.response.status).to.equal(400);
          expect(error.response.data.error).to.be.a('string');

          done();
        });
    });
  });

  describe('on delete', () => {
    it('removes a movie', () => {
      axios.delete(endpoint, { movieId })
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.error).to.be.null;
          expect(response.data.data).to.be.true;
        })
        .then(() => Movie.findOne({ movieId }).exec())
        .then((movie) => {
          expect(movie).to.be.null;
        });
    });
  });
});
