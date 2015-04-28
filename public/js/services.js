
app.service('profileUserService', function(){
	var profileUser;
	this.setProfileUser = function(user){
		profileUser = user;
	}

	this.getProfileUser = function(){
		return profileUser;
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