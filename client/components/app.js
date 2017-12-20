angular.module('movie-shelf')

.component('app', {
  controller: function(server) {
    this.movies = [];
    this.shelf = [];

    this.searchResults = (data) => {
      this.movies = data.results;
      console.log('UPDATED MOVIES', this.movies);
    };

    server.getShelf((myMovies) => {
      this.shelf = myMovies;
      console.log('filled your shelf with ', this.shelf);
    });
  },

  templateUrl: '/templates/app.html'

});
