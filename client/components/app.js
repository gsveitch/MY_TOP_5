angular.module('movie-shelf')

.component('app', {
  controller: function() {
    this.movies = window.fakeMovieData; //<-----------------------change this to real data
    this.myMovies = [];

    this.addMovie = (movie) => {
      this.shelf.unshift(movie);
    }
    this.addMovie = this.addMovie.bind(this);

  },

  templateUrl: '/templates/app.html'

});









// this.goToX = (X) => {
  //   //if home
  //     //send get request to / for fresh top5List
  //   this.whereAmI = X;
  //   console.log(`hey! i'm at ${this.whereAmI}`);
  // };
  // this.goToX = this.goToX.bind(this);
                      // this.selectTop5 = (top5) => {
                      //   this.currentTop5 = top5;
                      // };
                      // this.selectTop5 = this.selectTop5.bind(this);