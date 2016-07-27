var express = require('express');
var mysql = require("mysql");
var crypto = require('crypto'), encrypt_algo = 'aes-256-ctr';

var routes = express();

// Encryption Function

function encrypt(text){
	var cipher = crypto.createCipher(algorithm,password)
	var crypted = cipher.update(text,'utf8','hex')
	crypted += cipher.final('hex');
	return crypted;
}
 
function decrypt(text){
	var decipher = crypto.createDecipher(algorithm,password)
	var dec = decipher.update(text,'hex','utf8')
	dec += decipher.final('utf8');
	return dec;
}

//MySql

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "diageo"
});

con.connect(function(err){
	if(err){
		console.log('Error connecting to Db');
		return;
	}
	console.log('Connection established');
});


routes.get('/api/autocomplete/:q', function (req, res) {
	var qry = 'SELECT postcode FROM valid_postcodes where postcode like '+con.escape('%'+req.params.q+'%');
	console.log(qry);
	con.query(qry,function(err,rows){
		if (!err){
			res.send(JSON.stringify(rows));
		}
		else{
	    	res.send(err);
		}
	});
});

routes.post('/api/checkUserExist', function (req, res) {
	var qry = 'SELECT * FROM users where email = "'+req.body.email+'"';
	con.query(qry,function(err,rows){
		if (!err){
			var status='';
			if(rows.length>0){
				status = false;
			}
			else{
				status = true;
			}
			res.send(status);
		}
		else{
	    	res.send(err);
		}
	});
});

module.exports = routes;