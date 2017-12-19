angular.module('my-top-5')

.component('app', {
  templateUrl: '/templates/app.html',
  controller: function() {
    this.top5s = window.exampleVideoData;
    this.home = true;
  }
});