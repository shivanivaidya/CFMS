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
        when('/viewStudent/', {
            templateUrl: 'views/profiles/viewStudentProfile.html',
            controller: 'ProfileController'
        }).
        when('/viewRecruiter/', {
            templateUrl: 'views/profiles/viewRecruiterProfile.html',
            controller: 'ProfileController'
        }).
         when('/viewCompany/', {
            templateUrl: 'views/profiles/viewCompanyProfile.html',
            controller: 'ProfileController'
        }).
         when('/search', {
            templateUrl: 'views/search/search.html',
            controller: 'SearchController'
        }).
        when('/addJob', {
            templateUrl: 'views/job/addJob.html',
            controller: 'JobController'
        }).
         when('/viewJob', {
            templateUrl: 'views/job/viewJobs.html',
            controller: 'JobController'
        }).
        when('/searchJobs', {
            templateUrl: 'views/job/searchJobs.html',
            controller: 'JobController'
        }).
        when('/displayJobs', {
            templateUrl: 'views/job/displayJobs.html',
            controller: 'JobController'
        });
        /*.otherwise({
        	redirectTo:"/login"
        });*/
       
        });

app.controller("indexController", function($scope, $location){
	$location.path('/login');
});
    
   	