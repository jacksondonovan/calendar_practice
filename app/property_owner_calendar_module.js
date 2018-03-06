var app = angular.module('calendarpo',[])

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});

app.controller('calendarCTRL', function(){
    vm = this;
    vm.example = 'jackson donovan'
    vm.changeName = function(){
      fetch('https://randomuser.me/api/?r=1').then((response)=>{
        console.log('status' , response.status);
        response.json().then((data)=>{
          vm.example = data.results[0].name.first
          console.log(data.results[0].name.first);
        })
      })
    };
});
