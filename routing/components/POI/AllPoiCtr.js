angular.module('citiesApp')
    .controller('AllPoiCtr', ['$routeParams', '$http','checkToken','$location','$rootScope', function ($routeParams, $http,checkToken,$location,$rootScope) {
        let self = this;
        let serverUrl = 'http://localhost:3000/'
        self.PicSelected="/assets/img/unlike.JPG"
        self.chooseFilter="No-Filter"

        self.cats = [
            { id: 1, text: 'Shopping' },
            { id: 2, text: 'Nightclub' },
            { id: 3, text: 'Resturants' },
            { id: 4, text: 'Attractions' }
        ];

        self.sortValue = '';
        self.sortByRank = function () {self.sortValue = '-Rank'; }
        

        self.init=function(){
            checkToken.check();
        }
      
        self.getAllPoi = function (id) {
            $http.get(serverUrl + "POI/getAllPOI/")
                .then(function (response) {
                    //First function handles success
                    self.POI = response.data;
                    self.arr=self.POI
                }, function (response) {
                    self.POI = response.data;
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }

        self.goTo=function(name){
            $location.path('/poi/id/'+name)
        }

        self.goFav=function(name){
            $location.path('/fav')
        }

        self.checkifFav=function(name){
            if($rootScope.localFav.length>0){
            if($rootScope.localFav.filter(value=> value.ID==name.ID).length > 0)
                return true;
            else
                return false;
            }
        }

        self.getCatName=function(name){
            return self.cats[name-1].text
        }

        self.getCatID=function(mycat){
            if(self.cats.filter(cat => cat.text === mycat)[0]) 
                return self.cats.filter(cat => cat.text === mycat)[0].id
            else
                return undefined
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
    }]);
