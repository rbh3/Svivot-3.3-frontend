angular.module('citiesApp')
    .controller('poiCtrl', ['$location', '$http', function ($location, $http) {
        let self = this;
        let serverUrl = 'http://localhost:3000/'

        self.cats = [
            { id: 1, text: 'Shopping' },
            { id: 2, text: 'Nightclub' },
            { id: 3, text: 'Resturants' },
            { id: 4, text: 'Attractions' }
        ];

        self.getPOIbyID = function () {
            $http.get(serverUrl + "POI/getPOIbyID/33")
                .then(function (response) {
                    //First function handles success
                    self.POI = response.data;
                    self.POI_cat = self.cats[(self.POI.CategoryID)-1].text;
                    self.POI_date = self.POI.Date;
                }, function (response) {
                    self.POI = response.data;
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }



    }]);
