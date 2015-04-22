var app = angular.module('myApp', []);

app.controller('LoginController', function($scope) {
    $scope.username= "";
    $scope.password= "";
	
	$scope.users = [
        {'user' : 'Student'},
        {'user' : 'Recruiter'},
		{'user' : 'Company'}
    ];
	
	$scope.go = function ( path ) {
		$location.path( path );
	};
});

