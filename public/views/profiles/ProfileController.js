
app.controller('ProfileController', function($scope, $http) {
	$scope.Student = false;
	$scope.Company = false;
	$scope.Recruiter = true;

	$scope.degrees = [];

	$http.get("/major").success(function (response){
		$scope.majors = response;
		$scope.majors.sort( sortBy("major"));
		$scope.selectedMajor = $scope.majors[0];
		$scope.degrees = $scope.selectedMajor.degrees;
		$scope.selectedDegree = $scope.degrees[0];
	});	

	$http.get("/student/009").success(function (response){
		$scope.firstName = response[0].firstName;
		$scope.lastName = response[0].lastName;
		$scope.email = response[0].email;
		$scope.contactNo = response[0].contactNo;
		$scope.selectedMajor = $scope.majors[response[0].majorId];
		$scope.degrees = $scope.selectedMajor.degrees;

		for(var i = 0; i< $scope.degrees.length; i++){
			if($scope.degrees[i].name == response[0].degree)
				$scope.selectedDegree = $scope.degrees[i];
		}

		$scope.skills = response[0].skills;
		$scope.gpa = response[0].gpa;
		$scope.gradDate = new Date(response[0].gradDate);
		$scope.nuid = response[0].nuid;	
	});

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
    	var student = {firstName: $scope.firstName, lastName: $scope.lastName,
					  email: $scope.email, contactNo: $scope.contactNo, majorId: $scope.selectedMajor._id,
					  degree: $scope.selectedDegree.name, skills: $scope.skills, gpa: $scope.gpa,
					  gradDate: new Date($scope.gradDate)};

								
	    $http.put("/student/" + "009", student)
		.success(function (response){
			$scope.firstName = "";
			$scope.lastName = "";
			$scope.email = "";
			$scope.contactNo = "";
			$scope.selectedMajor = $scope.majors[0];
			$scope.degrees = $scope.selectedMajor.degrees;
			$scope.selectedDegree = $scope.degrees[0];
			$scope.skills = "";
			$scope.gpa = "";
			$scope.gradDate = null;
		});
    }
})