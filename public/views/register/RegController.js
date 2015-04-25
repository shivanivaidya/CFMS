
app.controller('RegController', function($scope, $location, $http) {	
	$scope.Student = true;
	$scope.Company = false;
	$scope.Recruiter = false;

	$scope.passwordMatch = false;
	
	$scope.users = [
		{'user' : '<Select User>'},
        {'user' : 'Student'},
        {'user' : 'Recruiter'},
		{'user' : 'Company'}
    ];

    $scope.selectedUser = $scope.users[0];
	
	$scope.companies = [
		{'company' : '<Select Company>'},
        {'company' : 'ClickFuel'},
        {'company' : 'AppNexus'},
		{'company' : 'Amazon'},
		{'company' : 'VMWare'}
    ];
	
	$scope.selectedCompany = $scope.companies[0];

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

	$scope.checkPswdMatch = function(){
		if($scope.formData.confirmPassword == $scope.regForm.password.$viewValue)
			$scope.passwordMatch = true;
		else
			$scope.passwordMatch = false;
	}

	$scope.register = function(){
		switch($scope.selectedUser.user) {
			case "Student":     var student = {nuid: $scope.nuid, password: $scope.formData.password, firstName: "", lastName: "",
											  email: "", contactNo: "", skills: "", gpa: 0.0, gradDate: new Date()};
								
							    $http.post("/student", student)
								.success(function (response){
									$scope.nuid = "";
									$scope.formData.password = "";
									$scope.formData.confirmPassword = "";
									$scope.selectedUser = $scope.users[0];
									$scope.regForm.password.$dirty = false;
									$scope.regForm.confirmPassword.$dirty = false;
								});
								break;
			case "Recruiter":	var recruiter = {username: $scope.username, password: $scope.formData.password, firstName: "", 
								lastName: "", email: "", contactNo: "", companyId: "", designation: "", location: ""};
							
							    $http.post("/recruiter", recruiter)
								.success(function (response){
									$scope.username = "";
									$scope.formData.password = "";
									$scope.formData.confirmPassword = "";
									$scope.selectedUser = $scope.users[0];
									$scope.selectedCompany = $scope.companies[0];
									$scope.regForm.password.$dirty = false;
									$scope.regForm.confirmPassword.$dirty = false;
								});
								break;
			case "Company":		var company = {_id: "056", username: $scope.username, password: $scope.formData.password, 
								companyName: $scope.companyName, website: "", industry: "", headquarters: "",
								contactNo: "", description: ""};
							
							    $http.post("/company", company)
								.success(function (response){
									$scope.companyName = "";
									$scope.username = "";
									$scope.formData.password = "";
									$scope.formData.confirmPassword = "";
									$scope.selectedUser = $scope.users[0];
									$scope.regForm.password.$dirty = false;
									$scope.regForm.confirmPassword.$dirty = false;
								});
								break;
			default:			break;
		
		}
	}

	$scope.cancel = function () {
		$location.path("/login");
	};
});

