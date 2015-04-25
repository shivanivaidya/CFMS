var express = require('express');

var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname +  '/public'))	;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// MONGOOSE SCHEMAS

mongoose.connect('mongodb://localhost/CFMS_DB');

// student
var StudentSchema = new mongoose.Schema({
	nuid: {type: String, unique: true, required: true},
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	contactNo: String,
	skills: String,
	gpa: Number,
	gradDate: Date
}, {collection: "student"});

var Student = mongoose.model('Student', StudentSchema);

//---------------------------------------------------------------------------------------------------------

// recruiter
var RecruiterSchema = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	contactNo: String,
	companyId: String,
	designation: String,
	location: String
}, {collection: "recruiter"});

var Recruiter = mongoose.model('Recruiter', RecruiterSchema);

//---------------------------------------------------------------------------------------------------------

// company
var CompanySchema = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	contactNo: String,
	companyId: String,
	designation: String,
	location: String
}, {collection: "company"});

var Company = mongoose.model('Company', CompanySchema);

//---------------------------------------------------------------------------------------------------------

// major
var MajorSchema = new mongoose.Schema({
	_id: {type: Number, unique: true, required: true},
	major: String,
	degrees: [{name: String}],
	college: String,
	students: [{nuid: String}]
}, {collection: "major"});

var Major = mongoose.model('Major', MajorSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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



//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(3000);
