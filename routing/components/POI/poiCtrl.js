angular.module('citiesApp')
    .controller('poiCtrl', ['$location', '$http', function ($location, $http) {
        let self = this;
        let serverUrl = 'http://localhost:3000/'

        self.getPOIbyID = function () {
            $http.get(serverUrl + "POI/getPOIbyID/33")
                .then(function (response) {
                    //First function handles success
                    self.POI = response.data;

                }, function (response) {
                    self.random = response.data
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }
    }]);
