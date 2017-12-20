angular.module("movie-shelf")
  .component("shelf", {
    bindings: {
      myMovies: "<"
    },
    controller: function (server) {
    
    },
    templateUrl: "/templates/shelf.html"
});