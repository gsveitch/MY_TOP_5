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
  // .service(server)
  ;