app.controller('SearchController', function($scope, $http, $location, $rootScope, profileUserService, loginService) {

	$scope.students = [];
	$scope.companies = [];

	$scope.goToEditProfile = function(){
		profileUserService.setProfileUser($rootScope.currentUser);

		switch($rootScope.currentUser.userType) {
			case "Student": 	$location.url("/studentProfile");
								break;
			case "Recruiter":	$location.url("/recruiterProfile");
								break;
			case "Company":		$location.url("/companyProfile");
								break;
			default:			
								break;
		}
	}

	$scope.viewMyProfile = function(){
		profileUserService.setProfileUser($rootScope.currentUser);
		switch($rootScope.currentUser.userType) {
			case "Student": 	$location.url("/viewStudent");
								break;
			case "Recruiter":	$location.url("/recruiterProfile");
								break;
			case "Company":		$location.url("/companyProfile");
								break;
			default:			
								break;
		}
    } 

    $scope.viewUser = function(user, userType){
    	switch(userType){
    		case "Student": 	profileUserService.setProfileUser({nuid: user.nuid, firstName: user.firstName, 
	    						lastName: user.lastName, userType: "Student"});
								$location.url("/viewStudent");
								break;
			case "Recruiter": 	profileUserService.setProfileUser({username: user.username, firstName: user.firstName,
								lastName: user.lastName, userType: "Recruiter"});
								$location.url("/viewRecruiter");
								break;
			case "Company": 	profileUserService.setProfileUser({companyId: user._id, userType: "Company"});
								$location.url("/viewCompany");
								break;
    	}
			
    }  

    $scope.displayStudentSearch = function(){

    	$http.get("/student").success(function (response){
			$scope.students = response;
		});

    	$scope.studentSearch = true;
    	$scope.companySearch = false;
    	$scope.jobSearch = false;
    }

    $scope.displayCompanySearch = function(){

    	$http.get("/company").success(function (response){
			$scope.companies = response;
		});

    	$scope.studentSearch = false;
    	$scope.companySearch = true;
    	$scope.jobSearch = false;
    }

    $scope.displayJobSearch = function(){
    	$scope.studentSearch = false;
    	$scope.companySearch = false;
    	$scope.jobSearch = true;
    }

    $scope.toggle = function(userType){
    	switch(userType){
    		case 'Student': $scope.studentSearch = !$scope.studentSearch;
    						break;
    		case 'Recruiter': $scope.companySearch = !$scope.companySearch;
    						  break;
    		case 'Company': $scope.jobSearch = !$scope.jobSearch;
    						break;
    	}
    }

    $scope.logout = function(){
   		loginService.logout();
    }
});

