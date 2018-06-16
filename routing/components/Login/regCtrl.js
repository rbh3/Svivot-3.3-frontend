angular.module('citiesApp')
    .controller('regCtrl', ['$http', '$scope', '$location', 'setHeadersToken', 'localStorageModel', function ($http, $scope, $location, setHeadersToken, localStorageModel) {
        let self = this;
        self.user = []

        self.cats = ["Shopping", "Nightclub", "Resturants", "Attractions"];
        self.selectedCategories = [];

        self.questions1 = ["What is the name of your first pet?", "What's your high-school name?"];
        self.questions2 = ["What is the name of your grandmother (mother-side)?", "What is your favorite sport team?"];

        //XML countries
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.getXMLcountries(this);
            }
        };

        xmlhttp.open("GET", "./countries.xml", true);
        xmlhttp.send();

        self.getXMLcountries = function (xml) {
            var i;
            var xmlDoc = xml.responseXML;
            var cntrs = [];
            var x = xmlDoc.getElementsByTagName("Country");
            for (i = 0; i < x.length; i++) {
                cntrs.push(x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue.toString());
            }
            self.Countries = cntrs;
        }
        //End of XML countries

        //At least 2 categories
        this.chooseCat = function (cat) {
            var index = self.selectedCategories.indexOf(cat);
            if (index == -1) {
                self.selectedCategories.push(cat);
            }
            else {
                self.selectedCategories.splice(index, 1);
            }
        }

        self.submitForm = function () {
            self.user.Username = self.Username
            self.user.Password = self.Password
            self.user.Fname = self.Fname
            self.user.Lname = self.Lname
            self.user.City = self.City
            self.user.Country = self.Country
            self.user.Email = self.Email
            self.user.categories = self.selectedCategories
            self.user.Q1 = self.Q1
            self.user.A1 = self.A1
            self.user.Q2 = self.Q2
            self.user.A2 = self.A2
            $http.post("http://localhost:3000/users/", self.user)
                .then(function (response) {
                    if (response.data === "Username already exists, please choose another") {
                        alert(response.data)
                        return
                    }
                    else if (response.status === 200) {
                        alert(self.Username + "was succefully added!")
                        $location.path("/Login")
                        return
                    }                    
                    ///FORWORD TO POI PAGE!!!!
                    //   $location.path('/reg')

                }, function (response) {
                    //Second function handles error
                    alert("Something went wrong");
                    return
                });
        }


    }]);