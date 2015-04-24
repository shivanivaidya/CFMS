var express = require('express');
//var path = require('path');

var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname +  '/public'))	;

//app.get('/', function (req, res) {
//   res.send('Hello World');
//});

app.post("/login", function(req, res){
	var obj = req.body;
	var doc = new Login(obj);
	doc.save();
	res.send();
})


mongoose.connect('mongodb://localhost/CFMS_DB');

var LoginSchema = new mongoose.Schema({
  email: String,
  password: String,
  userType: String
}, {collection: "login"});

var Login = mongoose.model('Login', LoginSchema);
app.listen(3000);
