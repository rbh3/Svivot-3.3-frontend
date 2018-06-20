angular.module('citiesApp')
    .controller('indexController',['$rootScope','localStorageModel','setHeadersToken', function ($rootScope,localStorageModel,setHeadersToken) {

        self = this;
        $rootScope.userName="Guest"
        $rootScope.isConnected=false;
        $rootScope.localFav=[];

        self.reset=function(){
           $rootScope.userName="Guest"
           $rootScope.isConnected=false
           localStorageModel.removeToken('token')
           setHeadersToken.set("")
           $rootScope.localFav=[];
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "./countries.xml", true);
        xmlhttp.send();
        $rootScope.myXML=xmlhttp;
    }]);
