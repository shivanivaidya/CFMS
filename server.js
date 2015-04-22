var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
var multer = require('multer');

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.use(express.static(path.join(__dirname,  'public')));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);


});

app.get("/developers", function (req, res) {
   DeveloperModel.find(function (err, data) {
       res.json(data);
   });  
});
 