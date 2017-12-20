angular.module("movie-shelf")
  .component("shelf", {
    bindings: {
      myMovies: "<",
      spliceit: "<"
    },
    controller: function (server) {
    
    },
    templateUrl: "/templates/shelf.html"
});