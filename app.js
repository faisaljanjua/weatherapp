(function () {
    var app = angular.module('weatherApp',
        ['ngRoute', 'firebase'])
        .constant('FIREBASE_URL', 'https://weatherapp-9a183.firebaseio.com');

    // Firebase Config
    var config = {
        apiKey: "AIzaSyDQIl6EwgFNPXsyQ8xFCULDXV86iKKN5iA",
        authDomain: "weatherapp-9a183.firebaseapp.com",
        databaseURL: "https://weatherapp-9a183.firebaseio.com",
        projectId: "weatherapp-9a183",
        storageBucket: "weatherapp-9a183.appspot.com",
        messagingSenderId: "286416591176"
    };
    firebase.initializeApp(config);

    // Config
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix("");
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'view/dashboard.html',
            })
            .when('/login', {
                templateUrl: 'view/login.html',
                controller: 'registerController'
            })
            .when('/register', {
                templateUrl: 'view/register.html',
                controller: 'registerController'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });
    }]);

    // Services
    app.factory('Authentication', ['$rootScope', '$firebase', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL',
        function ($rootScope, $firebase, $firebaseAuth, $firebaseObject, FIREBASE_URL) {
            var auth = $firebaseAuth();
            return {
                login: function (user) {
                    var credential = firebase.auth.EmailAuthProvider.credential(user.email, user.password);

                    auth.$signInWithCredential(credential)
                        .then(function (firebaseUser) {
                            console.log(firebaseUser.uid);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                register: function (user) {
                    console.log("register");
                    auth.$createUserWithEmailAndPassword(user.email, user.password)
                        .then(function (firebaseUser) {
                            console.log(firebaseUser)
                            var ref = new Firebase(FIREBASE_URL + "users")
                                .child(firebaseUser.uid).set({
                                    date: Firebase.ServerValue.TIMESTAMP,
                                    firstname: user.fname,
                                    lastname: user.lname,
                                    uid: firbaseUser.uid,
                                    email: user.email,
                                });

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }


        }]);

    // Controllers
    app.controller('registerController', ['$scope', 'Authentication', function ($scope, Authentication) {
        $scope.login = function () { Authentication.login($scope.user); };

        $scope.register = function () { Authentication.register($scope.user); };
    }]);
})();
