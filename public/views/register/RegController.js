
app.controller('RegController', function($scope) {	
	$scope.Student = true;
	$scope.Company = false;
	$scope.Recruiter = false;

	$scope.passwordMatch = false;
	//$scope.enableRegister = false;
	
	$scope.users = [
		{'user' : '<Select User>'},
        {'user' : 'Student'},
        {'user' : 'Recruiter'},
		{'user' : 'Company'}
    ];

    $scope.selectedUser = $scope.users[0];
	
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
	}

	$scope.print = function(){
		console.log($scope.selectedUser.user);
		console.log($scope.nuid);
		//$scope.username = "";
		console.log($scope.formData.confirmPassword);
		console.log($scope.regForm.password.$viewValue);
		//$scope.selectedCompany = "";
		//$scope.companyName = "";*/
	}	

	$scope.checkPswdMatch = function(){
		if($scope.formData.confirmPassword == $scope.regForm.password.$viewValue)
			$scope.passwordMatch = true;
		else
			$scope.passwordMatch = false;
	}
});

