angular.module('citiesApp')
    .controller('poiCtrl', ['$routeParams', '$rootScope', '$route', '$location', '$http', 'checkToken', function ($routeParams, $rootScope, $route, $location, $http, checkToken) {
        let self = this;
        let serverUrl = 'http://localhost:3000/'

        self.init = function () {
            checkToken.check();
        }

        self.posblRank = [1, 2, 3, 4, 5]

        self.checkifFav=function(name){
            if($rootScope.localFav.length>0){
            if($rootScope.localFav.filter(value=> value.ID==name.ID).length > 0)
                return true;
            else
                return false;
            }
        }

        self.saveFav=function(name){
            if($rootScope.localFav.filter(value=> value.ID==name.ID).length > 0)
           {
                let i=$rootScope.localFav.findIndex(x => x.ID === name.ID) 
                if(i>-1)
                    $rootScope.localFav.splice(i,1);
           }
           else{
                $rootScope.localFav.push(name); 
           }
        }

        self.cats = [
            { id: 1, text: 'Shopping' },
            { id: 2, text: 'Nightclub' },
            { id: 3, text: 'Resturants' },
            { id: 4, text: 'Attractions' }
        ];

        self.getPOIbyID = function (id) {
            $http.get(serverUrl + "POI/getPOIbyID/" + id)
                .then(function (response) {
                    //First function handles success
                    self.POI = response.data;
                    self.POI_cat = self.cats[(self.POI.CategoryID) - 1].text;
                    self.POI_revs = self.POI.Reviews;
                    for (var i = 0; i < self.POI_revs.length; i++)
                        self.POI_revs[i].Date = self.POI_revs[i].Date.substring(0, 10);

                }, function (response) {
                    self.POI = response.data;
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }

        self.getPOIbyName = function (name) {
            $http.get(serverUrl + "POI/getPOIbyName/" + name)
                .then(function (response) {
                    //First function handles success
                    self.POI = response.data[0];
                    self.POI_cat = self.cats[(self.POI.CategoryID) - 1].text;
                    self.POI_revs = self.POI.Reviews;
                    for (var i = 0; i < self.POI_revs.length; i++)
                        self.POI_revs[i].Date = self.POI_revs[i].Date.substring(0, 10);

                }, function (response) {
                    self.POI = response.data;
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }

        self.getPOI = function () {
            if ($routeParams.name)
                self.getPOIbyName($routeParams.name)
            else if ($routeParams.id)
                self.getPOIbyID($routeParams.id)

        }

        self.submitForm = function () {
            let user = {
                id: $routeParams.id,
                rank: self.ReviewRank,
                body: self.ReviewBody,
            }
            $http.post("http://localhost:3000/POI/reg/addRank/", user)
                .then(function (response) {
                    if (response.data === "Review Added") {
                        alert(response.data)
                        $route.reload()
                    }
                    else if (response.data === "The same review from this user exists") {
                        alert(response.data)
                        document.getElementById('id01').style.display='none'
                    }
                }, function (response) {
                    //Second function handles error
                    alert("Something went wrong");
                    return
                });
        }



    }]);
