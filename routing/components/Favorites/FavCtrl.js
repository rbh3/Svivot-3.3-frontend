angular.module('citiesApp')
    .controller('FavCtrl', ['$routeParams', '$http', 'checkToken', '$location', '$rootScope', function ($routeParams, $http, checkToken, $location, $rootScope) {
        let self = this;
        let serverUrl = 'http://localhost:3000/'
        self.PicSelected = "/assets/img/unlike.JPG"
        self.chooseFilter = "No-Filter"

        self.cats = [
            { id: 1, text: 'Shopping' },
            { id: 2, text: 'Nightclub' },
            { id: 3, text: 'Resturants' },
            { id: 4, text: 'Attractions' }
        ];

        //self.sortValue = '';
        //self.sortByRank = function () {self.sortValue = '-Rank'; }

        self.init = function () {
            checkToken.check();
            self.myOrderFav = {}
            if ($rootScope.localFav) {
                for (var i = 0; i < $rootScope.localFav.length; i++) {
                    var poi=$rootScope.localFav[i];
                    self.myOrderFav[poi.ID] = i;
                }
            }
        }

        self.goTo = function (name) {
            $location.path('/poi/id/' + name)
        }

        self.checkifFav = function (name) {
            if ($rootScope.localFav.length > 0) {
                if ($rootScope.localFav.filter(value => value.ID == name.ID).length > 0)
                    return true;
                else
                    return false;
            }
        }

        self.getCatName = function (name) {
            return self.cats[name - 1].text
        }

        self.getCatID = function (mycat) {
            if (self.cats.filter(cat => cat.text === mycat)[0])
                return self.cats.filter(cat => cat.text === mycat)[0].id
            else
                return undefined
        }

        self.saveFav = function (name) {
            if ($rootScope.localFav.filter(value => value.ID == name.ID).length > 0) {
                let i = $rootScope.localFav.findIndex(x => x.ID === name.ID)
                if (i > -1) {
                    $rootScope.localFav.splice(i, 1);
                    delete self.myOrderFav[name.ID]
                }
            }
            else {
                $rootScope.localFav.push(name);
                self.myOrderFav[name.ID]=$rootScope.localFav.length;
            }
        }

        self.loc = function (id) {
            let i = $rootScope.localFav.findIndex(x => x.ID === id)
            return i;
        }

        self.savtoDB = function () {
            if(!$rootScope.localFav)
                return;
            favorites=[];
            for(let i=0;i<$rootScope.localFav.length;i++)
                favorites.push($rootScope.localFav[i].ID)
            $http.post("http://localhost:3000/POI/reg/storeFav", favorites)
                .then(function (response) {
                    if (response.data === "Favorite list Updated") {
                        alert("Favorite list Updated")
                    }
                }, function (response) {
                    //Second function handles error
                    alert("Something went wrong");
                    return
                });
        }

    }]);
