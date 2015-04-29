
app.service('profileUserService', function($location, $rootScope){
	var profileUser;
	this.setProfileUser = function(user){
		profileUser = user;
	}

	this.getProfileUser = function(){
		return profileUser;
	}

	this.viewUser = function(user, userType){
    	switch(userType){
    		case "Student": 	this.setProfileUser({nuid: user.nuid, firstName: user.firstName, 
	    						lastName: user.lastName, userType: "Student"});
								$location.url("/viewStudent");
								break;
			case "Recruiter": 	this.setProfileUser({username: user.username, companyId: user.companyId, firstName: user.firstName,
								lastName: user.lastName, userType: "Recruiter"});
								$location.url("/viewRecruiter");
								break;
			case "Company": 	this.setProfileUser({companyId: user._id, userType: "Company"});
								$location.url("/viewCompany");
								break;
    	}		
    }  

     this.goToEditProfile = function(){
		this.setProfileUser($rootScope.currentUser);

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
});

app.service('jobService', function($rootScope, $location){
	var job;
	this.setJob = function(j){
		job = j;
	}

	this.getJob = function(){
		return job;
	}
});

app.service('loginService', function($http, $rootScope, $location){
	 this.logout = function(){
       $http.post("/logout")
       .success(function(){
           $rootScope.currentUser = null;
           $location.url("/login");
       });
   } 
});