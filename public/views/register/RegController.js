
app.controller('RegController', function($scope) {	
	$scope.Student = true;
	$scope.Company = false;
	$scope.Recruiter = false;
	
	$scope.users = [
        {'user' : 'Student'},
        {'user' : 'Recruiter'},
		{'user' : 'Company'}
    ];
	
	$scope.companies = [
        {'company' : 'ClickFuel'},
        {'company' : 'AppNexus'},
		{'company' : 'Amazon'},
		{'company' : 'VMWare'}
    ];
	
	$scope.displayFields = function(){
		switch($scope.selectedUser.user) {
			case "Student": 	$scope.Student = true;
								$scope.Recruiter = false;
								$scope.Company = false;
								break;
			case "Recruiter":	$scope.Student = false;
								$scope.Recruiter = true;
								$scope.Company = false;
								break;
			case "Company":		$scope.Student = false;
								$scope.Recruiter = false;
								$scope.Company = true;
								break;
			default:			$scope.Student = true;
								$scope.Recruiter = false;
								$scope.Company = false;
								break;
		
		}
		
		/*$scope.nuid = "";
		$scope.username = "";
		//$scope.formData.confirmPassword = "";
		$scope.regForm.password.$viewValue = "";
		$scope.selectedCompany = "";
		$scope.companyName = "";*/
	}	
});

angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.regForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})