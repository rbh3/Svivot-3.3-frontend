angular.module('citiesApp')
    .controller('indexController',['$rootScope', function ($rootScope) {

        self = this;
        $rootScope.userName="Guest"
        $rootScope.isConnected=false;
        
        self.reset=function(){
           $rootScope.userName="Guest"
           $rootScope.isConnected=false;
        }
    }]);
