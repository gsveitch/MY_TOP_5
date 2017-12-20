angular.module('movie-shelf')

.component('app', {
  controller: function() {
    this.movies = []; //<-----------------------change this to real data
    this.shelf = [];

    this.addMovie = (movie) => {
      this.shelf.unshift(movie);
    }
    this.addMovie = this.addMovie.bind(this);

    this.searchResults = (data) => {
      this.movies = data.results;
      console.log('UPDATED MOVIES', this.movies);
    };
    // this.searchResults = this.searchResults.bind(this);

  },

  templateUrl: '/templates/app.html'

});

// .controller('AppCtrl',
//   function () {
//     this.movies = [];

//     this.addMovie = (movie) => {
//       this.shelf.unshift(movie);
//     }
//     this.addMovie = this.addMovie.bind(this);

//     this.searchResults = (data) => {
//       this.movies = data.results;
//       console.log('UPDATED MOVIES', this.movies);
//     };
//   })
//   .component('app', {
//     bindings: {},
//     controller: 'AppCtrl',
//     templateUrl: '/templates/app.html'
//   });









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