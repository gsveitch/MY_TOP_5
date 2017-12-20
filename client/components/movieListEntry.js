angular.module('movie-shelf')
  .component('movieListEntry', {
    bindings: {
      movie: '<'
    },
    //finish up this function
    controller: function (server) {
      this.sendMovie = (movie) => {
        server.addMovie(movie)
      };
    },
    templateUrl: '/templates/movieListEntry.html',
  });