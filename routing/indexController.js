angular.module('citiesApp')
    .controller('indexController',['$rootScope', function ($rootScope) {

        self = this;

        self.reset=function(){
           $rootScope.userName="Guest"
           $rootScope.isConnected=false;
        }
    }]);
