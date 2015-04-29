app.controller('SearchController', function($scope, $http, $location, $rootScope, profileUserService, loginService, jobService) {

	$scope.students = [];
	$scope.companies = [];
	$scope.jobs = [];

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
   	profileUserService.viewUser(user, userType);
   }

   $scope.viewJob = function(job){
   	jobService.setJob(job);
   	$location.url("/viewJob");
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

    	$http.get("/job").success(function (response){
			$scope.jobs = response;	
		});

    	$scope.studentSearch = false;
    	$scope.companySearch = false;
    	$scope.jobSearch = true;
    }

  	$scope.goToAddJob = function(){
  		$location.url("/addJob");
  	}

    $scope.logout = function(){
   		loginService.logout();
    }
});

