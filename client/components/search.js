angular.module("movie-shelf")

  .component("search", {
    bindings: {
      result: "<"
    },
    controller: function (itunes) {
      this.onClick = (query) => {
        itunes.search(query, this.result);
      };
    },
    templateUrl: "templates/search.html"
  });