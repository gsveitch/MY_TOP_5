angular.module('movie-shelf')
  .component('movieList', {
    bindings: {
      movies: '<',
      pushit: '<'
    },
    controller: function () { 
      
    },
    templateUrl: '/templates/movieList.html'
  });
