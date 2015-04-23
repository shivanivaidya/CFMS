var app = angular.module('myApp', []);

app.controller('LoginController', function($scope, $http) {
    $scope.username = "";
    $scope.password = "";
	
	$scope.users = [
        {'user' : 'Student'},
        {'user' : 'Recruiter'},
		{'user' : 'Company'}
    ];
	
	$scope.add = function(){
		var student = {email: $scope.username, password: $scope.password, userType: $scope.selectedUser.user};
		$http.post("/login", student)
		.success(function (response){
			$scope.username = "";
			$scope.password = "";
			$scope.selectedUser = {};
		});
		
	}

});

