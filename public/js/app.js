app = angular.module('myApp', ['ngRoute']);


app.config(function($routeProvider){
    $routeProvider
    	.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginController'
        }).
    	when('/register', {
            templateUrl: 'views/register/registration.html',
            controller: 'RegController'
        }).
        when('/studentProfile', {
            templateUrl: 'views/profiles/studProfile.html',
            controller: 'ProfileController'
        }).
        when('/recruiterProfile', {
            templateUrl: 'views/profiles/recProfile.html',
            controller: 'ProfileController'
        }).
        when('/companyProfile', {
            templateUrl: 'views/profiles/compProfile.html',
            controller: 'ProfileController'
        }).
        otherwise({
        	redirectTo:"/login"
        });
       
        });

app.controller("indexController", function($scope, $location){
	$location.path('/login');
});
    
   	