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
		switch($scope.selectedUser.user) {
			case "Student": 	$location.path("/studentProfile");
								break;
			case "Recruiter":	$location.path("/recruiterProfile");
								break;
			case "Company":		$location.path("/companyProfile");
								break;
			default:			
								break;
		
		}
		
	};

	$scope.register = function () {
		$location.path("/register");
	};

});

