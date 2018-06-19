angular.module('citiesApp')
    .controller('FavCtrl', ['$routeParams', '$http','checkToken','$location','$rootScope', function ($routeParams, $http,checkToken,$location,$rootScope) {
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



        self.init=function(){
            checkToken.check();
        }

        self.getFav=function(){
            if(self.POI&& $rootScope.localFav){
            self.myFav=[];
            for(let i=0;i<self.POI.length;i++){
                var ind=$rootScope.localFav.indexOf(self.POI[i].ID);
                if(ind>-1)
                    self.myFav.push(self.POI[i]);
            }
            return self.myFav;
        }
        }
      
        self.getAllPoi = function (id) {
            $http.get(serverUrl + "POI/getAllPOI/")
                .then(function (response) {
                    //First function handles success
                    self.POI = response.data;
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
                let i=$rootScope.localFav.indexOf(name);
                if(i>-1)
                {
                    for(var j=0;j<self.myFav.length;j++)
                        if(name===self.myFav[j].ID)
                            self.myFav.splice(j,1);
                    $rootScope.localFav.splice(i,1);
                }
           }
           else{
                $rootScope.localFav.push(name); 
                for(var j=0;j<self.POI.length;j++)
                    if(name===self.POI[j].ID)
                        self.myFav.push(self.POI[j])
           }
        }

        self.loc=function(id){
            return $rootScope.localFav.indexOf(id);

         }
    }]);
