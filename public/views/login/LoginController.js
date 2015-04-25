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
	
	$scope.add = function(){
		var student = {email: $scope.username, password: $scope.password, userType: $scope.selectedUser.user};
		$http.post("/login", student)
		.success(function (response){
			$scope.username = "";
			$scope.password = "";
			$scope.selectedUser = {};
		});
		
	}

	$scope.register = function () {
		$location.path("/register");
	};

});

