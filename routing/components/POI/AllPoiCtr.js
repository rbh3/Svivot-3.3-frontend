angular.module('citiesApp')
    .controller('AllPoiCtr', ['$routeParams', '$http','checkToken','$location','$rootScope', function ($routeParams, $http,checkToken,$location,$rootScope) {
        let self = this;
        let serverUrl = 'http://localhost:3000/'
        self.PicSelected="/assets/img/unlike.JPG"
        $rootScope.localFav=[];
        self.chooseFilter="No-Filter"

        self.cats = [
            { id: 1, text: 'Shopping' },
            { id: 2, text: 'Nightclub' },
            { id: 3, text: 'Resturants' },
            { id: 4, text: 'Attractions' }
        ];



        self.init=function(){
            checkToken.check();
            
            if($rootScope.isConnected==true)
            {
                $http.get(serverUrl + "POI/reg/FavoritesByUsername/0")
                .then(function (response) {
                    //First function handles success
                    temp = response.data;
                    for(var i=0; i<temp.length;i++)
                        $rootScope.localFav.push(temp[i].ID);
                }, function (response) {
                    self.POI = response.data;
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
            }
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

        self.checkifFav=function(name){
            if($rootScope.localFav.includes(name))
                return true;
            else
                return false;
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
           if($rootScope.localFav.includes(name))
           {
                let i=localFav.indexOf(name);
                if(i>-1)
                    $rootScope.localFav.splice(i,1);
           }
           else{
                $rootScope.localFav.push(name); 
           }
        }
    }]);
