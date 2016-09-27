var myApp = angular.module('AddressBook', [ "ngRoute", "ngAnimate"]);

myApp.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'search.html'
    }).when('/new', {
        templateUrl: 'new.html',
        controller: 'AddEntryController'
    }).otherwise({
        redirectTo: '/'
    })
}]);

myApp.controller('AddressBookController', function($scope){

});

myApp.controller('SearchController', function($scope, $http){

    $scope.addresses = {};
    $scope.search = {};
    $scope.search.lastName = "";

    $scope.search = function(){
        console.log('search() called');
        var url = 'http://addressbook:8080/addresses';

        if($scope.search.lastName){
            url = url + "?lastname=" + $scope.search.lastName;
        }

        $http.get(url).success(function (data) {
            $scope.addresses = data;
        });
    };

});


myApp.controller('AddEntryController', function($scope, $http){

    $scope.address = {};

    $scope.save = function(){
        console.log('save() called');
        var url = 'http://addressbook:8080/addresses';

        $http({
            method  : 'POST',
            url     : url,
            data    : JSON.stringify($scope.address)
        })
            .success(function(data) {
                console.log(data);
            });


    }

});

