var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
var multer = require('multer');

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.use(express.static(path.join(__dirname,  'public')));
app.listen(3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.post("/login", function(req, res){
	var obj = req.body;
	var doc = new Login(obj);
	doc.save();
	res.send();
})

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CFMS_DB');

var LoginSchema = new mongoose.Schema({
  email: String,
  password: String,
  userType: String
}, {collection: "login"});

var Login = mongoose.model('Login', LoginSchema);
