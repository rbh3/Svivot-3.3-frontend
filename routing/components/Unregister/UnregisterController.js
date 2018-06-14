angular.module('citiesApp')
.controller('UnregisterController', ['$location','$http', function($location,$http) {
    let self=this;
    let serverUrl = 'http://localhost:3000/'
    
    
    self.get3rand=function(){
      $http.get(serverUrl + "POI/Random3")
                .then(function (response) {
                    //First function handles success
                    self.random = response.data;
                }, function (response) {
                    self.random = response.data
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
    }

    self.signUp=function(){
      $location.path('/Login')
    }
  }]);