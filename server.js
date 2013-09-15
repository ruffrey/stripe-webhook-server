
/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , colors = require('colors')
  , config = require('./config.js')
  , webhookServer = require('./lib/webhook-server.js')
  , dateUtils = require('date-utils')
  , D = require('./lib/d.js')
  , app = express();


// Configurations
app.configure(function(){
	app.set('env', process.env.NODE_ENV || 'dev');
	
	app.use(express.compress({
		level: 9,
		memLevel: 9
	}));
	
	app.set('config', config);
	
	app.use(express.bodyParser({ keepExtensions: true}));
	app.use(express.limit('1.5mb'));
	app.use(express.methodOverride());
	
	// Passport Authentication
	
	app.set('port', config.port);
	
	app.set('json spaces',0);
	
	app.use(app.router);
	
	// honestly this only servers robots.txt
	app.use(express.static(__dirname+'public'));
});

app.configure('dev', function(){
	app.use(express.errorHandler());
	app.get('/', webhookServer); // makes testing a little easier
});
app.configure('acpt', function(){
	app.use(express.errorHandler());
	app.get('/', webhookServer); // makes testing a little easier
});
app.configure('prod', function(){
	app.use(function(err, req, res, next){
		console.error(D().red);
		console.error(err.stack.red);
		res.send(500, 'Something broke!');
	});
});

// bind routes
app.post('/', webhookServer);
app.all('*', function(req, res) {
	res.send(404);
});

// Starting up the server
http.createServer(app).listen(app.get('port'), function(){
	
	console.log(
		D(), 
		"stripe-webhook-server is alive on port".blue.bold, 
		app.get('port')
	);
	
});
