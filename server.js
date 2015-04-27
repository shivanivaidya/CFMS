var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CFMS_DB');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname +  '/public'))	;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// MONGOOSE SCHEMAS

// student
var StudentSchema = new mongoose.Schema({
	nuid: {type: String, unique: true, required: true},
	password: {type: String, select: false},
	firstName: String,
	lastName: String,
	email: String,
	contactNo: String,
	majorId: Number,
	degree: String,
	skills: String,
	gpa: Number,
	gradDate: Date
}, {collection: "student"});

var Student = mongoose.model('Student', StudentSchema);

//---------------------------------------------------------------------------------------------------------

// recruiter
var RecruiterSchema = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, select: false},
	firstName: String,
	lastName: String,
	email: String,
	contactNo: String,
	companyId: String,
	designation: String,
	city: String
}, {collection: "recruiter"});

var Recruiter = mongoose.model('Recruiter', RecruiterSchema);

//---------------------------------------------------------------------------------------------------------

// company
var CompanySchema = new mongoose.Schema({
	_id: String,
	username: {type: String, unique: true, required: true},
	password: {type: String, select: false},
	companyName: String,
	website: String,
	industry: String,
	headquarters: String,
	contactNo: String,
	aboutUs: String,
}, {collection: "company"});

var Company = mongoose.model('Company', CompanySchema);

//---------------------------------------------------------------------------------------------------------

// major
var MajorSchema = new mongoose.Schema({
	_id: {type: Number, unique: true, required: true},
	major: String,
	degrees: [{name: String}],
	college: String,
}, {collection: "major"});

var Major = mongoose.model('Major', MajorSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST REQUESTS

app.post("/student", function(req, res){
	var obj = req.body;
	var doc = new Student(obj);
	doc.save();
	res.send();
})

//------------------------------------------------------------------------------------------------------------

app.post("/recruiter", function(req, res){
	var obj = req.body;
	var doc = new Recruiter(obj);
	doc.save();
	res.send();
})

//----------------------------------------------------------------------------------------------------------

app.post("/company", function(req, res){
	var obj = req.body;
	var doc = new Company(obj);
	doc.save();
	res.send();
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET REQUESTS

app.get("/student/:nuid", function(req, res){
	 if(req.params.nuid){
	 	Student.find({ nuid: req.params.nuid }, function (err, docs){
	 		res.json(docs);
	 	})
	 }
})

//------------------------------------------------------------------------------------------------------------

app.get("/recruiter/:username", function(req, res){
	 if(req.params.username){
	 	Recruiter.find({ username: req.params.username }, function (err, docs){
	 		res.json(docs);
	 	})
	 }
})

//------------------------------------------------------------------------------------------------------------

app.get("/company/:username", function(req, res){
	 if(req.params.username){
	 	Company.find({ username: req.params.username }, function (err, docs){
	 		res.json(docs);
	 	})
	 }
})

//-------------------------------------------------------------------------------------------------------------

app.get("/company", function (req, res){
	var Query = Company.find();
	Query.select('companyName');

	Query.exec(function (err, docs) {
        res.json(docs);
    });
})   

//------------------------------------------------------------------------------------------------------------

app.get("/major", function (req, res){
	var Query = Major.find();
	Query.select('major degrees');

	Query.exec(function (err, docs){
		res.json(docs);
	})
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PUT REQUESTS

app.put("/student/:nuid", function (req, res){
	Student.update({ nuid: req.params.nuid }, req.body, { upsert: true}, function (err, numAffected){
 		res.send();
	});
})

//----------------------------------------------------------------------------------------------------------

app.put("/recruiter/:username", function (req, res){
	Recruiter.update({ username: req.params.username }, req.body, { upsert: true}, function (err, numAffected){
 		res.send();
	});
})

//------------------------------------------------------------------------------------------------------------

app.put("/company/:username", function (req, res){
	Company.update({ username: req.params.username }, req.body, { upsert: true}, function (err, numAffected){
 		res.send();
	});
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PASSPORT.JS AUTHENTICATION

passport.use(new LocalStrategy(
function(username, password, done)
{
	var userArray = username.split(" ");
	username = userArray[0];
	userType = userArray[1];

    if (userType == "Student"){
	    Student.findOne({nuid: username, password: password}, function(err, user)
	    {
	        if (err) { return done(err); }
	        if (!user) { return done(null, false); }
	        return done(null, {nuid: user.nuid, userType: "Student"});
	    })
    }
    else if (userType == "Recruiter"){
    	Recruiter.findOne({username: username, password: password}, function(err, user)
	    {
	        if (err) { return done(err); }
	        if (!user) { return done(null, false); }
	        return done(null, {username: user.username, companyId: user.companyId, userType: "Recruiter"});
	    })
    }
    else if (userType == "Company"){
    	Company.findOne({username: username, password: password}, function(err, user)
	    {
	        if (err) { return done(err); }
	        if (!user) { return done(null, false); }
	        return done(null, {username: user.username, userType: "Company"});
	    })
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post("/login", passport.authenticate('local'), function(req, res){
    var user = req.user;
    res.json(user);
});

app.get('/loggedin', function(req, res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
});
    
app.post('/logout', function(req, res)
{
    req.logOut();
    res.send(200);
});     

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(3000);
