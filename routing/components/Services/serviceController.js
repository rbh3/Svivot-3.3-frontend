angular.module('citiesApp')
    .service('setHeadersToken',[ '$http', function ($http) {
        let token = ""
        this.set = function (t) {
            token = t
            $http.defaults.headers.common[ 'x-access-token' ] = t
            // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
            console.log("set")
           }
        }])

    .service('checkToken',['setHeadersToken','localStorageModel', function (setHeadersToken,localStorageModel) {
        if(localStorageModel.getLocalStorage('token')!=null)
             setHeadersToken.set(localStorageModel.getLocalStorage('token'))
        console.log("HYYYYYY")
        }])


    .controller('serviceController', ['$location', '$http', 'setHeadersToken','localStorageModel','checkToken' ,function ($location, $http, setHeadersToken,localStorageModel,checkToken) {
        self = this;

        self.directToPOI = function () {
            $location.path('/poi')
        }

        let serverUrl = 'http://localhost:3000/'

        let user = {
            Username: "test1",
            Password: "11111111",
            Fname: "rr",
            Lname:"ttt",
            City: "gfgf",
            Country: "ggfgf",
            Email:"fggbv",
            categories: 1,
            categories: 2,
            Q1:"fvfvfv",
            A1:"fvfvfv" ,
            Q2: "fVfv",
            A2: "fdcdc" 
        }

        let user2 = {
            userName: "test1",
            password: "11111111",
        }

        self.signUp = function () {
            // register user
            $http.post(serverUrl + "Users/", user)
                .then(function (response) {
                    //First function handles success
                    self.signUp.content = response.data;
                }, function (response) {
                    //Second function handles error
                    self.signUp.content = "Something went wrong";
                });
        }

        self.login = function () {
            // register user
            $http.post(serverUrl + "Users/authenticate",user2)
                .then(function (response) {
                    if(response.data.message==="bad values"){
                        alert("can't login")
                        return
                    }
                    //First function handles success
                    self.login.content = response.data.token;
                    setHeadersToken.set(self.login.content)
                    localStorageModel.addLocalStorage('token', self.login.content)
                }, function (response) {
                    //Second function handles error
                    self.login.content = "Something went wrong";
                });
        }

        self.reg = function () {
            // register user
            $http.get(serverUrl + "POI/reg/FavoritesByUsername/2")
                .then(function (response) {
                    //First function handles success
                    self.reg.content = response.data;
                }, function (response) {
                    self.reg.content = response.data
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }
    }]);


