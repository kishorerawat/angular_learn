var express = require('express');
var mongojs = require('mongojs');

var app = express();
var conactlist_db = mongojs('contactlist', ['contactlist']);

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
	res.send("Hello World from server.js");
});

//connecting to Mongodb collection named "contactlist"
//and returing the data in JSON format
app.get('/contactlist', function(req, res) {
	console.log("Received HTTP-GET request for /contactlist");

	conactlist_db.contactlist.find(function(err, docs) {
		res.json(docs);
	});
});

app.listen(3000);

console.log('Server running on port 3000');


//added these comments and a log from git branch MyFeature2
console.log("Changes from MyFeature2")
