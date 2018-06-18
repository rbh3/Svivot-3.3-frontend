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

    .service('checkToken',['$location','$http','setHeadersToken','localStorageModel','$rootScope', function ($location,$http,setHeadersToken,localStorageModel,$rootScope) {
        this.check= function(){
        let token=localStorageModel.getLocalStorage('token');
        if(token!=null){
        //needs to check experation date
             setHeadersToken.set(token)
             $http.get("http://localhost:3000/POI/reg/authToken/"+token).then(function(response){
                if(response.data.message==='Failed to authenticate token.')
                {
                    localStorageModel.removeToken('token')
                    $rootScope.userName="Guest"
                    $rootScope.isConnected=false;
                    $location.path("/")
                }
                else if(response.data.message==='Success')
                {
                    setHeadersToken.setUser(response.data.payload.userName)
                }
             })
            }
        
        console.log("HYYYYYY")
        }
        }])



