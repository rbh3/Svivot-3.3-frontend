angular.module('citiesApp')
.controller('aboutController', ['$scope','checkToken', function($scope,checkToken) {
    this.init=function(){
      checkToken.check();
  }
  }]);