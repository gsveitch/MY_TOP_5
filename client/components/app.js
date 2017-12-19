angular.module('my-top-5')

.component('app', {
  templateUrl: '/templates/app.html',
  controller: function() {
    this.top5s = window.fakeTop5s;
    this.currentTop5 = window.fakeTop5s[0];
    this.whereAmI = 'home';
    //something to store top 5 while being built, before pushing to database
    //perhaps a constructor function???
    this.top5bucket = {}; 

    this.displayHome = () => {
      this.whereAmI = 'home';
      console.log(`hey! i'm at ${this.whereAmI}`)
    };
    this.displayMaker = () => {
      this.whereAmI = 'maker';
      console.log(`hey! i'm at ${this.whereAmI}`)
    }
    this.displayTop5 = (top5) => {
      this.whereAmI = 'top5';
      console.log(`hey! i'm at ${this.whereAmI}`)
    }
    this.displayHome = this.displayHome.bind(this);
    this.displayMaker = this.displayMaker.bind(this);
    this.displayTop5 = this.displayTop5.bind(this);
  }
});