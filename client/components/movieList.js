angular.module('movie-shelf')
  .component('movieList', {
    bindings: {
      movies: '<',
    },
    controller: function () { },
    templateUrl: '/templates/movieList.html'
  });
