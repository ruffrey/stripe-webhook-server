var debug = require('debug')('webhook-server');
var express = require('express');
var http = require('http');
var config = require('./config.js');
var routes = require('./routes/');
var app = express();


// Configurations
app.configure(function(){
	app.set('env', process.env.NODE_ENV || 'dev');
	app.use(express.compress({
		level: 9,
		memLevel: 9
	}));
	app.set('config', config);
	app.use(express.bodyParser({ keepExtensions: true }));
	app.use(express.limit('1.5mb'));
	app.use(express.methodOverride());
	app.set('port', config.port);
	app.set('json spaces', 0);
	app.use(app.router);
	// this only serves robots.txt
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});
app.configure('production', function(){
	app.use(function(err, req, res, next){
		debug(err);
		debug(err.stack);
		res.send(500, {error: 'Something broke!'});
	});
});

// bind routes
app.post(config.webhookEndpointPath, routes.webhookHandler(config));
app.all('*', function(req, res) {
	setTimeout(function () {
		debug('404', req.url);
		res.send(404, { error: 'Route not matched' });
	}, 1000);
});

// Starting up the server
http.createServer(app).listen(app.get('port'), function () {
	debug(
		"stripe-webhook-server is alive on port", 
		app.get('port')
	);
});
