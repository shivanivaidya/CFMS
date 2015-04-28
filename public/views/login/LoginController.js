app.controller('LoginController', function($scope, $http, $location, $rootScope) {
    $scope.user = {};

	$scope.users = [ 'Student', 'Recruiter', 'Company'];

    $scope.selectedUser = $scope.users[0];
	
	$scope.login = function(user){
		var sendUser = {username: user.username + " " + $scope.selectedUser, password: user.password};
		
		$http.post("/login", sendUser)
		.success(function(response){
            $rootScope.currentUser = response;
            $location.url("/search");
	    });
		
	};

	$scope.register = function () {
		$location.path("/register");
	};

});

