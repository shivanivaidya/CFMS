angular.module('myApp', ['ngRoute'])

.config(function($routeProvider){
    $routeProvider.when('/login', {
            templateUrl: '/views/login/login.html',
            controller: 'LoginController'
        });
       
        });
    
   	