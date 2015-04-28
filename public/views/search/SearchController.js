app.controller('SearchController', function($scope, $http, $location, $rootScope) {

	$scope.students = [];
	$scope.companies = [];

	$scope.goToEditProfile = function(){
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

    $scope.viewStudent = function(student){
    	$location.url("/viewStudent/" + student);
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
			console.log($scope.companies);
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
});
