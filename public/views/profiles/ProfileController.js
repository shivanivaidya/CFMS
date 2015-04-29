
app.controller('ProfileController', function($scope, $http, $rootScope, $location, profileUserService, loginService) {
	$scope.Student = true;
	$scope.Company = false;
	$scope.Recruiter = false;

	$scope.isMyProfile = false;

	$scope.degrees = [];
	$scope.recruiters = [];

	$http.get("/major").success(function (response){
		$scope.majors = response;
		$scope.majors.sort( sortBy("major"));
		$scope.selectedMajor = $scope.majors[0];
		$scope.degrees = $scope.selectedMajor.degrees;
		$scope.selectedDegree = $scope.degrees[0];
		$scope.college = $scope.selectedMajor.college;
	});	

	$scope.getProfileData = function(user){
		if(user == $rootScope.currentUser){
			$scope.isMyProfile = true;
		}
		else{
			$scope.isMyProfile = false;
		}

		switch(user.userType) {
			case "Student": 	$http.get("/student/" + user.nuid).success(function (response){
									$scope.firstName = response[0].firstName;
									$scope.lastName = response[0].lastName;
									$scope.email = response[0].email;	
									$scope.contactNo = response[0].contactNo;
									$scope.selectedMajor = $scope.majors[response[0].majorId];
									$scope.degrees = $scope.selectedMajor.degrees;
									$scope.selectedDegree = $scope.degrees[0];
									$scope.college = $scope.selectedMajor.college;

									for(var i = 0; i< $scope.degrees.length; i++){
										if($scope.degrees[i].name == response[0].degree)
											$scope.selectedDegree = $scope.degrees[i];
									}

									$scope.skills = response[0].skills;
									$scope.gpa = response[0].gpa;
									$scope.gradDate = new Date(response[0].gradDate);
									$scope.nuid = response[0].nuid;	
								});

								break;
			case "Recruiter":	$http.get("/recruiter/" + user.username).success(function (response){
									$scope.username = response[0].username;
									$scope.firstName = response[0].firstName;
									$scope.lastName = response[0].lastName;
									$scope.email = response[0].email;
									$scope.contactNo = response[0].contactNo;
									$scope.designation = response[0].designation;
									$scope.city = response[0].city;
									$scope.companyId = user.companyId;
								});

								$http.get("/company/" + user.companyId).success(function (response){
									$scope.companyName = response[0].companyName;
								})

								break;
			case "Company":		$http.get("/company/" + user.companyId).success(function (response){
									$scope.companyId = response[0]._id;
									$scope.companyName = response[0].companyName;
									$scope.website = response[0].website;
									$scope.industry = response[0].industry;
									$scope.headquarters = response[0].headquarters;
									$scope.contactNo = response[0].contactNo;
									$scope.aboutUs = response[0].aboutUs;
									$http.get("/recruiterByCId/" + user.companyId).success(function (response){
										$scope.recruiters = response;
									});
								});
								break;
			default:			
								break;
		
		}
	}

	$scope.getProfileData(profileUserService.getProfileUser());

	$scope.updateMajorInfo = function(){
		$scope.degrees = $scope.selectedMajor.degrees;
		$scope.selectedDegree = $scope.degrees[0];
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

    $scope.save = function(){
    	switch($rootScope.currentUser.userType) {
			case "Student": 	var student = {firstName: $scope.firstName, lastName: $scope.lastName,
											  email: $scope.email, contactNo: $scope.contactNo, majorId: $scope.selectedMajor._id,
											  degree: $scope.selectedDegree.name, skills: $scope.skills, gpa: $scope.gpa,
											  gradDate: new Date($scope.gradDate)};
													
							    $http.put("/student/" + $rootScope.currentUser.nuid, student)
								.success(function (response){});

								break;
			case "Recruiter":	var recruiter = {firstName: $scope.firstName, lastName: $scope.lastName,
												email: $scope.email, contactNo: $scope.contactNo, 
												companyId: $rootScope.currentUser.companyId, designation: $scope.designation,
												city: $scope.city};

								$http.put("/recruiter/" + $rootScope.currentUser.username, recruiter)
								.success(function (response){});

								break;
			case "Company":		var company = {website: $scope.website, industry: $scope.industry,
											   headquarters: $scope.headquarters, contactNo: $scope.contactNo, 
											   aboutUs: $scope.aboutUs};

								$http.put("/company/" + $rootScope.currentUser.username, company)
								.success(function (response){});

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

    $scope.deleteStudent = function(nuid){
    	$http.delete("/student/" + nuid).success(function (response){
    		$location.url("/search");
    	});
    }

    $scope.deleteRecruiter = function(username){
    	$http.delete("/recruiter/" + username).success(function (response){
    		$scope.viewUser({_id: $scope.companyId}, 'Company');
    	});
    }

     $scope.deleteCompany = function(companyId){
    	$http.delete("/recruiterByCId/" + companyId).success(function (response){
    		$http.delete("/jobByCId/" + companyId).success(function (response){
    			$http.delete("/company/" + companyId).success(function (response){
    				$location.url("/search");
    			});
    		});
    	});
    }

    $scope.goToSearch = function(){
    	$location.url("/search");
    }

   $scope.goToEditProfile = function(){
   		profileUserService.goToEditProfile();
   }

   $scope.logout = function(){
   	loginService.logout();
   }
})