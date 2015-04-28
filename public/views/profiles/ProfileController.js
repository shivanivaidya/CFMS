
app.controller('ProfileController', function($scope, $http, $rootScope, $location, profileUserService) {
	$scope.Student = true;
	$scope.Company = false;
	$scope.Recruiter = false;

	$scope.degrees = [];

	$http.get("/major").success(function (response){
		$scope.majors = response;
		$scope.majors.sort( sortBy("major"));
		$scope.selectedMajor = $scope.majors[0];
		$scope.degrees = $scope.selectedMajor.degrees;
		$scope.selectedDegree = $scope.degrees[0];
		$scope.college = $scope.selectedMajor.college;
	});	

	$scope.getProfileData = function(user){
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
									$scope.firstName = response[0].firstName;
									$scope.lastName = response[0].lastName;
									$scope.email = response[0].email;
									$scope.contactNo = response[0].contactNo;
									$scope.designation = response[0].designation;
									$scope.city = response[0].city;
								});

								break;
			case "Company":		$http.get("/company/" + user.username).success(function (response){
									$scope.website = response[0].website;
									$scope.industry = response[0].industry;
									$scope.headquarters = response[0].headquarters;
									$scope.contactNo = response[0].contactNo;
									$scope.aboutUs = response[0].aboutUs;
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

    $scope.viewStudentProfile = function(user){
    	$scope.getProfileData(user);
    	$scope.college = $scope.selectedMajor.college;

    	$location.url("/viewStudent");
    }

    $scope.goToSearch = function(){
    	$location.url("/search");
    }

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

    $scope.logout = function(){
       $http.post("/logout")
       .success(function(){
           $rootScope.currentUser = null;
           $location.url("/login");
       });
   } 
})