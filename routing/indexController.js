angular.module('citiesApp')
    .controller('indexController',['$scope','setHeadersToken', function ($scope,setHeadersToken) {

        self = this;
        self.userName=setHeadersToken.get();
    }]);
