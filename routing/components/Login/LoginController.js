angular.module('citiesApp')
.controller('LoginController', ['$http','$scope','$location','setHeadersToken','localStorageModel',function($http,$scope,$location,setHeadersToken,localStorageModel) {
  let self=this;

  self.submitForm=function()
  {
    if(self.user.userName===""|| self.user.password==="")
      {
        return
      }
      $http.post("http://localhost:3000/users/authenticate",self.user)
      .then(function (response) {
        if(response.data.success==="bad values"){
            alert("can't login")
            return
        }
        if(response.data.success===false){
          alert(response.data.message)
          return
      }
        //First function handles success
        tok=response.data.token
        setHeadersToken.set(tok)
        localStorageModel.addLocalStorage('token', tok)

        ///FORWORD TO REG PAGE!!!!


    }, function (response) {
        //Second function handles error
        alert("Something went wrong");
        return
    });
  }


  $scope.register=function(){
    $location.path('/reg')
  }
  

  self.Forgot=function()
  {
    $location.path('/forgot')
  }


}]);
