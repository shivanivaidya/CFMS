
app.controller('RegController', function($scope, $location, $http) {	
	$scope.Student = true;
	$scope.Company = false;
	$scope.Recruiter = false;

	$scope.passwordMatch = false;

	$scope.companies = [];
	$scope.selectedCompany = {companyName: "<Select Company>"};
	
	$scope.users = [
		{'user' : '<Select User>'},
        {'user' : 'Student'},
        {'user' : 'Recruiter'},
		{'user' : 'Company'}
    ];

    $scope.selectedUser = $scope.users[0];

	$scope.updateCompanies = function(){
		$http.get("/company").success(function (response){
			$scope.companies = response;
			$scope.companies.sort( sortBy("companyName"));
			$scope.selectedCompany = $scope.companies[0];
		});
	}

	function sortBy(prop){
		return function(a,b){
	  		if( a[prop] > b[prop]){
	      		return 1;
	  		}else if( a[prop] < b[prop] ){
	      		return -1;
	  		}
	  		return 0;
		}
	}
		

	$scope.displayFields = function(){
		switch($scope.selectedUser.user) {
			case "Student": 	$scope.Student = true;
								$scope.Recruiter = false;
								$scope.Company = false;
								break;
			case "Recruiter":	$scope.Student = false;
								$scope.Recruiter = true;
								$scope.Company = false;
								$scope.updateCompanies();
								break;
			case "Company":		$scope.Student = false;
								$scope.Recruiter = false;
								$scope.Company = true;
								$scope.updateCompanies();
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
											  email: "", contactNo: "", majorId: 1, degree: "", skills: "", gpa: 0.0, 
											  gradDate: new Date()};
								
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
								lastName: "", email: "", contactNo: "", companyId: $scope.selectedCompany._id, designation: "", location: ""};
							
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
			case "Company":		var company = {_id: $scope.generateId(), username: $scope.username, password: $scope.formData.password, 
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
									$scope.updateCompanies();
								});
								break;
			default:			break;
		
		}
	}

	$scope.generateId = function(){
		var ids = [];
		for(var i = 0; i<$scope.companies.length; i++){
			ids.push(Number($scope.companies[i]._id));
		}
		var id = (Math.max.apply( Math, ids ) + 1).toString();
		if(id.length == 1)
			id = "00" + id;
		if(id.length == 2)
			id = "0" + id;
		return id;
	}

	$scope.cancel = function () {
		$location.path("/login");
	};
});

