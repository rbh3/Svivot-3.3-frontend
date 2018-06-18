let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        templateUrl: 'components/Unregister/Unregister.html',
        controller : 'UnregisterController as unregCtrl'
    })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/poi/name/:name?', {
            templateUrl: 'components/POI/poi.html',
            controller : 'poiCtrl as poiCtrl'
        })
        .when('/poi/id/:id?', {
            templateUrl: 'components/POI/poi.html',
            controller : 'poiCtrl as poiCtrl'
        })
        .when('/Unregister', {
            templateUrl: 'components/Unregister/Unregister.html',
            controller : 'UnregisterController as unregCtrl'
        })
        .when('/Login', {
            templateUrl: 'components/Login/Login.html',
            controller : 'LoginController as loginCtrl'
        })
        .when('/reg', {
            templateUrl: 'components/Login/reg.html',
            controller : 'regCtrl as regCtrl'
        })
        .when('/Poi', {
            templateUrl: 'components/POI/AllPoi.html',
            controller : 'AllPoiCtr as AllPoiCtr'
        })
        .otherwise({ redirectTo: '/' });

        
}]);