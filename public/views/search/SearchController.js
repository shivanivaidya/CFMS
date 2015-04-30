app.controller('SearchController', function($scope, $http, $location, $rootScope, profileUserService, loginService, jobService) {

	$scope.students = [];
	$scope.companies = [];
	$scope.jobs = [];
	$scope.bookmarkedJobs = [];

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
			case "Recruiter":	$location.url("/viewRecruiter");
								break;
			case "Company":		$location.url("/viewCompany");
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
    	$scope.recruiterSearch = false;
		$scope.showBookmarks = false;
    }

    $scope.displayCompanySearch = function(){

    	$http.get("/company").success(function (response){
			$scope.companies = response;
		});

    	$scope.studentSearch = false;
    	$scope.companySearch = true;
    	$scope.jobSearch = false;
    	$scope.recruiterSearch = false;
		$scope.showBookmarks = false;
    }

    $scope.displayJobSearch = function(){

    	$http.get("/job").success(function (response){
			$scope.jobs = response;	
		});

    	$scope.studentSearch = false;
    	$scope.companySearch = false;
    	$scope.jobSearch = true;
    	$scope.recruiterSearch = false;
		$scope.showBookmarks = false;

    }

    $scope.displaySelectiveJobSearch = function(companyId){
    	$http.get("/jobByCId/" + companyId).success(function (response){
			$scope.jobs = response;	
		});

    	$scope.studentSearch = false;
    	$scope.companySearch = false;
    	$scope.jobSearch = true;
    	$scope.recruiterSearch = false;
		$scope.showBookmarks = false;

    }

    $scope.displayRecruiterSearch = function(companyId){
    	$http.get("/recruiterByCId/" + companyId).success(function (response){
			$scope.recruiters = response;	
		});

    	$scope.studentSearch = false;
    	$scope.companySearch = false;
    	$scope.jobSearch = false;
    	$scope.recruiterSearch = true;
		$scope.showBookmarks = false;

    }

	$scope.displayBookmarkedJobs = function(){
		$http.get("/bookmarkByNuid/" + $rootScope.currentUser.nuid).success(function (response){
			$scope.bookmarkedJobs = [];
			var bookmarks = [];

			for(var i = 0; i<response.length; i++){
				bookmarks.push(response[i].jobId)
			}
			jobService.setBookmarks(bookmarks);

			$http.get("/job").success(function (response){
				$scope.jobs = response;	
				var jobIds = [];
				
				for(var i = 0; i<$scope.jobs.length; i++){
					$scope.jobs[i]._id
					jobIds.push($scope.jobs[i]._id);
				}
				
				for(var i = 0; i<bookmarks.length; i++){
					if(jobIds.indexOf(bookmarks[i]) > -1){
						$scope.bookmarkedJobs.push($scope.jobs[jobIds.indexOf(bookmarks[i])]);
					}
				}
			});
		})

		$scope.studentSearch = false;
    	$scope.companySearch = false;
    	$scope.jobSearch = false;
    	$scope.recruiterSearch = false;
		$scope.showBookmarks = true;
	}

		

  	$scope.goToAddJob = function(){
  		jobService.setJob(null);
  		$location.url("/addJob");
  	}

  	$scope.goToSearchJobs = function(){
  		if($rootScope.currentUser.userType == 'Student'){
  			$http.get("/bookmarkByNuid/" + $rootScope.currentUser.nuid).success(function (response){
  				var bookmarks = [];
  				for(var i = 0; i<response.length; i++){
  					bookmarks.push(response[i].jobId)
  				}
  				jobService.setBookmarks(bookmarks);
  			})
  		}
  		$location.url("/searchJobs");
  	}

    $scope.logout = function(){
   		loginService.logout();
    }
});

