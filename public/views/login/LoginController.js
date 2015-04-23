var app = angular.module('myApp', []);

app.controller('LoginController', function($scope) {
    $scope.username= "";
    $scope.password= "";
	
	$scope.users = [
        {'user' : 'Student'},
        {'user' : 'Recruiter'},
		{'user' : 'Company'}
    ];
	
	$scope.print = function(){
		console.log($scope.username);
		console.log($scope.password);
		console.log($scope.selectedUser.user);
	}
});

/*var app = angular.module('myApp', []);

app.controller('LoginController', function($scope)
{
    $scope.login = function()
    {
        console.log(hvjhvjhv);
    }
});*/

