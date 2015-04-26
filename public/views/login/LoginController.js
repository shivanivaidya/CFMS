//var app = angular.module('myApp', []);

app.controller('LoginController', function($scope, $http, $location) {
    $scope.username = "";
    $scope.password = "";
	
	$scope.users = [
        {'user' : 'Student'},
        {'user' : 'Recruiter'},
		{'user' : 'Company'}
    ];

    $scope.selectedUser = $scope.users[0];
	
	$scope.login = function(){
		$location.path("/studentProfile");
	};

	$scope.register = function () {
		$location.path("/register");
	};

});

