angular.module('citiesApp')
    .service('setHeadersToken', ['$http', '$rootScope','bringFavorites', function ($http, $rootScope,bringFavorites) {
        let token = ""
        this.set = function (t) {
            token = t
            $http.defaults.headers.common['x-access-token'] = t
            // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
            console.log("set")
            console.log(token)
        }

        this.setUser = function (user) {
            $rootScope.userName = user;
            $rootScope.isConnected = true;
            bringFavorites.importeFav();
        }
        $rootScope.userName = "Guest";
        $rootScope.isConnected = false;
        $rootScope.localFav=[];
    }])

    .service('checkToken', ['$location', '$http', 'setHeadersToken', 'localStorageModel', '$rootScope', function ($location, $http, setHeadersToken, localStorageModel, $rootScope) {
        this.check = function () {
            let token = localStorageModel.getLocalStorage('token');
            if (token != null) {
                //needs to check experation date
                setHeadersToken.set(token)
                $http.get("http://localhost:3000/POI/reg/authToken/" + token).then(function (response) {
                    if (response.data.message === 'Failed to authenticate token.') {
                        localStorageModel.removeToken('token')
                        setHeadersToken.set("")
                        $rootScope.userName = "Guest"
                        $rootScope.isConnected = false;
                        $location.path("/")
                    }
                    else if (response.data.message === 'Success') {
                        setHeadersToken.setUser(response.data.payload.userName)
                    }
                })
            }

            console.log("HYYYYYY")
        }
    }])

    .service('bringFavorites', ['$http', '$rootScope', function ($http, $rootScope) {
        this.importeFav = function (){
        if ($rootScope.isConnected == true && $rootScope.localFav.length==0) {
            $http.get("http://localhost:3000/POI/reg/FavoritesByUsername/0")
                .then(function (response) {
                    //First function handles success
                    if(response.data==="No Favorite")
                        return;
                    temp = response.data;
                    for (var i = 0; i < temp.length; i++){
                        $rootScope.localFav.push(temp[i]);
                    }
                }, function (response) {
                    self.POI = response.data;
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        

        console.log("Favorites Import Completed")
            }
    }
    }])




