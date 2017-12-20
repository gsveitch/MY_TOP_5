angular.module('movie-shelf')
  .component('movieListEntry', {
    bindings: {
      movie: '<',
      onClick: '<'
    },
    controller: function () {
      this.onClick = () => {
        $ctrl.onClick($ctrl.movie)
      };
    },
    templateUrl: '/templates/movieListEntry.html',
  });