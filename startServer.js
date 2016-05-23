var express = require('express');
var fs = require('fs');
var path = require('path');


var app = express();

var server = require('http').createServer(app);

var port = process.env.PORT || 9800;
server.listen(port);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/static/index.html');
});

app.post('/addItem', function(req, res){
	console.log(111112122)
	res.json({"success":true}); 
});