angular.module('citiesApp')
    .controller('indexController',['$rootScope', function ($rootScope) {

        self = this;
        $rootScope.userName="Guest"
        $rootScope.isConnected=false;

        self.reset=function(){
           $rootScope.userName="Guest"
           $rootScope.isConnected=false;
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "./countries.xml", true);
        xmlhttp.send();
        $rootScope.myXML=xmlhttp;
    }]);
