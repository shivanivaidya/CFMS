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
        otherwise({
        	redirectTo:"/login"
        });
       
        });

app.controller("indexController", function($scope, $location){
	$location.path('/login');
});
    
   	