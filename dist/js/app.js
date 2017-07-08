(function () {
    var wapp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

    wapp.config(function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
        $locationProvider.hashPrefix("");
        $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
        // $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://api.openweathermap.org/data/2.5/forecast/daily']);
        $routeProvider
            .when('/', {
                templateUrl: 'pages/home.html',
                controller: 'homeController'
            })
            .when('/forcast', {
                templateUrl: 'pages/forcast.html',
                controller: 'forcastController'
            });
    });

    wapp.service('cityService', function () {
        this.city = 'Shiraz';
    });

    wapp.controller('homeController', ['$scope', '$http', '$resource', 'cityService', function ($scope, $http, $resource, cityService) {
        $scope.srchCityName = cityService.city;
        $scope.$watch('srchCityName', function () {
            cityService.city = $scope.srchCityName;
        });


        var ApiKey = "ebd7f5b8d7bf5d4f26710c6154bc39a5";
        var BaseUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=' + ApiKey + '&q=London';

        var req = {
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
            params: { APPID: ApiKey, q: 'London,us' }
        };
        $http(req).then(function (response) {
            console.log(response);
            $rootScope.data = response.data;
        }).catch(function (response) {
            console.log(response);
        });
        //         var req = {
        //             method: 'GET',
        //             //url: 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=' + ApiKey + '&q=London,us',
        //             url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
        //             params: { APIID: ApiKey, q: 'London' },
        //             headers: {
        //                 'x-api-key': ApiKey
        //             }
        //         }

    }]);

    wapp.controller('forcastController', ['$scope', 'cityService', function ($scope, cityService) {
        $scope.cityName = cityService.city;
    }]);

})();































/*
(function () {
    var app = angular.module('fjapp', ['ngRoute']);

    app.config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix("");
        $routeProvider
            .when('/', {
                templateUrl: 'pages/home.html',
                controller: 'mainController'
            })
            .when('/about', {
                templateUrl: 'pages/about.html',
                controller: 'aboutController'
            })
            .when('/contact', {
                templateUrl: 'pages/contact.html',
                controller: 'contactController'
            });
    });

    app.service('userAccount', function () {
        this.user = "admin";
    });

    app.controller('mainController', ['$scope', 'userAccount', function ($scope, userAccount) {
        $scope.message = "Welcome to Homepage";
        $scope.username = userAccount.user;

        $scope.person = {
            name: 'John Doe',
            address: '555 New York'
        }
    }]);
    app.controller('aboutController', ['$scope', 'userAccount', function ($scope, userAccount) {
        $scope.message = "About us page";
        $scope.username = userAccount.user;

        $scope.person = {
            name: 'Einsten',
            address: 'reading books'
        }

    }]);
    app.controller('contactController', ['$scope', 'userAccount', function ($scope, userAccount) {
        $scope.message = "contact";
        $scope.username = userAccount.user;

        $scope.person = {
            name: 'Gulshan',
            address: 'Block-115',
            city: 'Karachi',
            zip: '75300'
        }
        $scope.formatedAddress = function () {
            return person.name + ", " + person.address + ", " + person.city + ", " + person.zip;
        }

    }]);

    app.directive('searchResult', function () {
        return {
            restrict: 'AE',
            templateUrl: 'directives/searchResult.html',
            replace: true,
            scope: {
                personFuntion: "&"
            },

        }
    });

})();



*/





























/*
(function () {
    var app = angular.module('fjapp', ['ngRoute']);

    app.config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix("");
        $routeProvider
            .when('/', {
                templateUrl: 'pages/home.html',
                controller: 'homeController'
            })
            .when('/about', {
                templateUrl: 'pages/about.html',
                controller: 'aboutController'
            })
            .when('/contact', {
                templateUrl: 'pages/contact.html',
                controller: 'contactController'
            });
    });

    app.service('userService', function () {
        this.userName = 'Faisal Janjua';
    });

    app.controller('homeController', ['$scope', 'userService', function ($scope, userService) {
        $scope.message = "Welcome to homepage";
        $scope.username = userService.userName;
    }]);

    app.controller('aboutController', ['$scope', 'userService', function ($scope, userService) {
        $scope.message = "About information will be here!";
        $scope.username = userService.userName;
    }]);

    app.controller('contactController', ['$scope', 'userService', function ($scope, userService) {
        $scope.message = "All contact information";
        $scope.username = userService.userName;
    }]);

    app.directive('searchResult', function () {
        return {
            restrict:'AECM',
            template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">List group item heading</h4><p class="list-group-item-text"></p></a>',
            replace: true
        }
    });
})();
*/