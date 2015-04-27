//var app = angular.module('myApp', []);

app.controller('LoginController', function($scope, $http, $location, $rootScope) {
    $scope.user = {};

	$scope.users = [ 'Student', 'Recruiter', 'Company'];

    $scope.selectedUser = $scope.users[0];
	
	$scope.login = function(user){
		var sendUser = {username: user.username + " " + $scope.selectedUser, password: user.password};
		switch($scope.selectedUser) {
			case "Student": 	$http.post("/login", sendUser)
        						.success(function(response){
						            $rootScope.currentUser = response;
						            $location.url("/studentProfile");
						        });
								break;
			case "Recruiter":	$http.post("/login", sendUser)
        						.success(function(response){
						            $rootScope.currentUser = response;
						            $location.url("/recruiterProfile");
						        });
								break;
			case "Company":		$http.post("/login", sendUser)
        						.success(function(response){
						            $rootScope.currentUser = response;
						            $location.url("/companyProfile");
						        });
								break;
			default:			
								break;
		
		}
		
	};

	$scope.register = function () {
		$location.path("/register");
	};

});

