angular.module('movie-shelf')

.component('app', {
  controller: function(server) {
    this.movies = [];
    this.shelf = [];

    this.searchResults = (data) => {
      this.movies = data.results;
      console.log('UPDATED MOVIES', this.movies);
    };

    this.pushit = (movie) => {
      this.shelf.unshift(movie);
      console.log('added to shelf', movie)
    }
    this.spliceit = (movie) => {
      let i = this.shelf.indexOf(movie);
      this.shelf.splice(i, 1);
    }
    // this.pushit = this.pushit.bind(this);
    // server.getShelf((myMovies) => {
    //   this.shelf = myMovies;
    //   console.log('filled your shelf with ', this.shelf);
    // });
  },

  templateUrl: '/templates/app.html'

});
