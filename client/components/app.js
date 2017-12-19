angular.module('my-top-5')

.component('app', {
  templateUrl: '/templates/app.html',
  controller: function() {
    this.top5s = window.fakeTop5s; //<-----------------------change this to real data
    this.currentTop5 = window.fakeTop5s[0];
    this.whereAmI = 'home';
    //something to store top 5 while being built, before pushing to database
    //perhaps a constructor function???
    this.top5bucket = {}; 

    this.goToX = (X) => {
      this.whereAmI = X;
      console.log(`hey! i'm at ${this.whereAmI}`)
    };
    this.goToX = this.goToX.bind(this);

    this.selectTop5 = (top5) => {
      this.currentTop5 = top5;
    };
    this.selectTop5 = this.selectTop5.bind(this);

    


  }
});