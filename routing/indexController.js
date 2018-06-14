angular.module('citiesApp')
    .controller('indexController',['setHeadersToken', function (setHeadersToken) {
//dor check

        self = this;

        self.userName = setHeadersToken.userName

    }]);
