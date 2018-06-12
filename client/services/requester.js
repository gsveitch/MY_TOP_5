angular.module('movie-shelf')
  .service('itunes', function ($http) {
    this.search = function (query, callback) {
        $http
        .get('https://itunes.apple.com/search?country=us&entity=movie&attribute=featureFilmTerm&limit=10&lang=en_us&term=' + query)
        .then(function (response) {
          if (callback) {
            callback(response.data);
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    };
  })
  .service('TheMovieDB', function ($http) {
    this.search = function (query) {
      return new Promise((resolve, reject) => {
        $http.get(`https://api.themoviedb.org/3/search/movie?api_key=44a2806dc36690e1da45fc1349e8845f&query=` + query)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (err) {
            reject(err);
          });
      });
    };

  })
  .service('server', function ($http) {
    this.getShelf = function (callback) {
      $http
        .get("/shelf")
        .then(function ({ data }) {
          console.log(data);
          if (callback) {
            callback(data);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    this.addMovie = function (movie, callback) {
      $http
        .post("/shelf", { params: { movie: movie } })
        .then(function ({ data }) {
          console.log(data);
          if (callback) {
            callback(data);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    this.deleteMovie = function (movie, callback) {
      $http({
        method: "DELETE",
        url: "/shelf",
        data: {
          movieId: movie._id
        },
        headers: {
          "Content-type": "application/json;charset=utf-8"
        }
      })
        .then(function ({ data }) {
          if (callback) {
            callback(data);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  });
  