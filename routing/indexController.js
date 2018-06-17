angular.module('citiesApp')
    .controller('indexController',['$rootScope','checkToken', function ($rootScope,checkToken) {

        self = this;
        $rootScope.userName="Guest"
        $rootScope.isConnected=false;

        self.load=function(){
            checkToken.check();
        }

        self.reset=function(){
           $rootScope.userName="Guest"
           $rootScope.isConnected=false;
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "./countries.xml", true);
        xmlhttp.send();
        $rootScope.myXML=xmlhttp;
    }]);
