var express = require('express');
var path = require('path');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// Middleware
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static(__dirname+'/'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(require('./routes.js'));

var port = process.env.port || 8081;

app.listen(port,function(){
	console.log('Site successfully running in port: ' + port);
})