var Debug = require('debug');
var Webhooks = require('../lib/webhooks.js');
var Stripe = require('stripe');
	
// Main function for responding to webhook
exports.webhookHandler = function (config) {

	var stripe = Stripe(config.stripe.secret_key);
	var debug = Debug('webhook-handler');
	var webhooks = Webhooks(config);
	
	return function middleware(req, res, next) {
		
		var api_data;
		var api_call = null;

		if(req.body.type)
		{
			api_data = req.body;
		}
		else if(req.query.type) 
		{
			api_data = req.query;
		}
		else{
			debug('missing data. body:', req.body, 'query:', req.query);
			setTimeout(function () {
				res.send(400, { error: 'Missing body'});
			}, 500);
			return;
		}
		
		try{
			api_call = eval("webhooks." + api_data.type);
		}
		catch(ignored) { } 
		
		if(!(api_call instanceof Function))
		{
			debug('unsupported webhoook', api_data.type, api_data.id);
			setTimeout(function () {
				res.send(200);
			}, 500);
			return;
		}

		// confirm that stripe was real
		
		stripe.events.retrieve(req.body.id, function(err, evt){
			if(err || !evt)
			{
				debug(
					'FAIL event confirmation',
					api_data.type,
					JSON.stringify(api_data),
					err.toString()
				);
				return;
			}
			debug('event confirmed', req.body.id);
			
			api_call(evt, res);
			
		});
	};
	
};

