angular.module('citiesApp')
    .controller('indexController',['$rootScope','localStorageModel','setHeadersToken','bringFavorites', function ($rootScope,localStorageModel,setHeadersToken,bringFavorites) {

        self = this;
        $rootScope.userName="Guest"
        $rootScope.isConnected=false;
        $rootScope.localFav=[];

        self.reset=function(){
           $rootScope.userName="Guest"
           $rootScope.isConnected=false
           $rootScope.localFav=[];
           bringFavorites.reset();
           localStorageModel.removeToken('token')
           setHeadersToken.set("")
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "./countries.xml", true);
        xmlhttp.send();
        $rootScope.myXML=xmlhttp;
    }]);
