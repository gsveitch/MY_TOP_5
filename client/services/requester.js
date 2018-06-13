angular.module('movie-shelf')
  .service('itunes', function ($http) {
    this.search = (query, callback) => {
      $http.get(`https://itunes.apple.com/search?country=us&entity=movie&attribute=featureFilmTerm&limit=10&lang=en_us&term=${query}`)
        .then((response) => {
          if (callback) {
            callback(response.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
  })
  .service('TheMovieDB', function ($http) {
    this.search = query => new Promise((resolve, reject) => {
      $http.get('/search', { params: { query } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

    this.searchVideos = id => new Promise((resolve, reject) => {
      $http.get('/searchVideo', { params: { id } })
        .then((response) => {
          // resolves an array of video reference objects
          resolve(response.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });

    this.searchCast = id => new Promise((resolve, reject) => {
      $http.get('/searchCast', { params: { id } })
        .then((response) => {
          // resolves an object with arrays on .cast and .crew  of objects containing data about the cast
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  })
  .service('server', function ($http) {
    this.getShelf = (callback) => {
      $http
        .get('/shelf')
        .then(({ data }) => {
          console.log(data);
          if (callback) {
            callback(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    this.addMovie = (movie, callback) => {
      $http
        .post('/shelf', { params: { movie } })
        .then(({ data }) => {
          console.log(data);
          if (callback) {
            callback(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    this.deleteMovie = (movie, callback) => {
      $http({
        method: 'DELETE',
        url: '/shelf',
        data: {
          movieId: movie._id,
        },
        headers: {
          'Content-type': 'application/json;charset=utf-8',
        },
      })
        .then(({ data }) => {
          if (callback) {
            callback(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  });
