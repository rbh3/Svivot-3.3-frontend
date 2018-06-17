angular.module('citiesApp')
    .service('setHeadersToken',[ '$http','$rootScope', function ($http,$rootScope) {
        let token = ""
        this.set = function (t) {
            token = t
            $http.defaults.headers.common[ 'x-access-token' ] = t
            // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
            console.log("set")
            console.log(token)
           }

        this.setUser = function (user) {
                $rootScope.userName=user;
                $rootScope.isConnected=true;
           }
           $rootScope.userName="Guest";
           $rootScope.isConnected=false;
    }])

    .service('checkToken',['$scope','$location','$http','setHeadersToken','localStorageModel', function ($http,$scope,$location,setHeadersToken,localStorageModel) {
        this.check=function(){
        let token=localStorageModel.getLocalStorage('token');
        if(token!=null)
        //needs to check experation date
             setHeadersToken.set(token)
             $http.get("http://localhost:3000/POI/reg/").then(function(response){
                if(response.data.message==='Failed to authenticate token.')
                {
                    localStorageModel.removeToken('token')
                    $scope.indexCtrl.reset();
                    $location.path("#/")
                }
             })
            }
        console.log("HYYYYYY")
        }])



