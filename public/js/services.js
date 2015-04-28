
app.service('profileUserService', function(){
	var profileUser;
	this.setProfileUser = function(user){
		profileUser = user;
		console.log(profileUser);
	}

	this.getProfileUser = function(){
		console.log(profileUser);
		return profileUser;
	}
});