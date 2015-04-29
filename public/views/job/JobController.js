app.controller('JobController', function($scope, $http, $location, $rootScope, loginService, profileUserService, jobService) {

	$scope.jobTypes = [ 'Full-Time', 'Co-op', 'Internship'];
	$scope.jobs = [];

	$scope.selectedJobType = $scope.jobTypes[0];

	 $http.get("/job").success(function (response){
			$scope.jobs = response;
		});

	$scope.save = function(){
		var job = {_id:$scope.generateId($scope.jobs), title: $scope.jobTitle, jobDescription: $scope.jobDescription, 
					qualifications: $scope.qualifications, type: $scope.selectedJobType, city: $scope.city, 
					compensation: $scope.compensation, companyId: $rootScope.currentUser.companyId};
		
		$http.post("/job", job)
		.success(function (response){
			$scope.jobTitle = "";
			$scope.jobDescription = "";
			$scope.qualifications = "";
			$scope.jobType = $scope.jobTypes[0];
			$scope.city = ""
			$scope.compensation = "";
		})	
	}

	$scope.getJob = function(job){
		if(job){
			$http.get("/job/" + job._id).success(function (response){
				$scope.jobTitle = response[0].title;
				$scope.jobDescription = response[0].jobDescription;
				$scope.qualifications = response[0].qualifications;
				$scope.jobType = response[0].type;
				$scope.city = response[0].city;
				$scope.compensation = response[0].compensation;
				$scope.jobId = response[0]._id;
				$scope.companyId = response[0].companyId;
				$http.get("/company/" + $scope.companyId).success(function (response){
					$scope.companyName = response[0].companyName;
				});
			});
		}
	}

	$scope.getJob(jobService.getJob());

	$scope.generateId = function(){
		var ids = [];
		for(var i = 0; i<$scope.jobs.length; i++){
			ids.push(Number($scope.jobs[i]._id));
		}
		var id = "1";
		if(ids.length > 0 ){
		 id = (Math.max.apply( Math, ids ) + 1).toString();
		}

		if(id.length == 1)
			id = "00" + id;
		if(id.length == 2)
			id = "0" + id;
		return id;
	}


	$scope.goToSearch = function(){
    	$location.url("/search");
    }

     $scope.goToEditProfile = function(){
   		profileUserService.goToEditProfile();
   	 }

   	$scope.viewUser = function(user, userType){
   		profileUserService.viewUser(user, userType);
    }

    $scope.deleteJob = function(id){
    	$http.delete("/job/" + id).success(function (response){
    		$location.url("/search");
    	});
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

    $scope.logout = function(){
   		loginService.logout();
    }
})