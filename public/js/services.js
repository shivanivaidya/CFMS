
app.service('profileUserService', function($location){
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