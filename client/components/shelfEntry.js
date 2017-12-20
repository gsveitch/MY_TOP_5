angular.module("movie-shelf")
  .component("shelfEntry", {
    bindings: {
      movie: "<"
    },
    controller: function (server) {
      this.comments = [];

      this.leaveComment = comment => {
        
      }
      this.reMovie = movie => {
        server.deleteMovie(movie);
      };
    },
    templateUrl: "/templates/shelfEntry.html"
});