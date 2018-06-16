angular.module('citiesApp')
    .service('setHeadersToken',[ '$http','$rootScope', function ($http,$rootScope) {
        let token = ""
        this.set = function (t) {
            token = t
            $http.defaults.headers.common[ 'x-access-token' ] = t
            // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
            console.log("set")
           }
           this.setUser = function (user) {
                $rootScope.userName=user;
           }
           $rootScope.userName="Guest"
        }])

    .service('checkToken',['setHeadersToken','localStorageModel', function (setHeadersToken,localStorageModel) {
        if(localStorageModel.getLocalStorage('token')!=null)
        //needs to check experation date
             setHeadersToken.set(localStorageModel.getLocalStorage('token'))
        console.log("HYYYYYY")
        }])



