var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
var multer = require('multer');

app.get('/', function (req, res) {
   res.send('Hello World');
});

/*app.get('/login', function (req, res) {
   res.render('/public/views/login/login');
});*/

app.use(express.static(path.join(__dirname,  'public')));
app.listen(3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


/*var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);


});

/*app.get("/developers", function (req, res) {
   DeveloperModel.find(function (err, data) {
       res.json(data);
   });  
});*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CFMS_DB');

var LoginSchema = new mongoose.Schema({
  email: String,
  password: String,
  loginas: String
}, {collection: "login"});

var Login = mongoose.model('Login', LoginSchema);

var record1 = new Login({ email: "shivani.9114@gmail.com", password: "abcde"});
var record2 = new Login({ email: "vaidya.shi@husky.neu.edu", password: "abcde1234"});

record1.save();
record2.save();
 