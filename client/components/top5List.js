angular.module('my-top-5')
    .component('top5List', {
        templateUrl: 'src/templates/top5List.html',
        controller: function () {
        
        },
        bindings: {
            top5s: '<',
            onClick: '<',
        }
    });