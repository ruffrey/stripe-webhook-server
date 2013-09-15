var config = require('../config.js'),
	D = require('../lib/d.js'),
	webhooks = require('./webhooks.js'),
	
	// Main function for responding to webhook
	WebhookResponse = function(req, res, next) {
		
		var api_data;
		if(req.body.type)
		{
			api_data = req.body;
		}
		else if(req.query.type) 
		{
			api_data = req.query;
		}
		else{
			console.log(D(), 'missing data'.red, 'body:', req.body, 'query:',req.query);
			res.send(400);
			return;
		}
		
		var api_call = null;
		
		try{
			api_call = eval("webhooks." + api_data.type);
		}
		catch(er) {	} 
		
		if(!api_call)
		{
			console.log(D(), 
				'unsupported api call'.bold.yellow, 
				api_data.type.cyan, 
				api_data.id.cyan
			);
			res.send(200);
			return;
		}

		/* confirm that stripe was real */
		
		var stripe = require('stripe')(config.stripe.secret_key);

		stripe.events.retrieve(req.body.id, function(err, evt){
			if(err || !evt)
			{
				console.log(
					D(),
					'event confirm fail'.bold.red,
					api_data.type.cyan,
					JSON.stringify(api_data),
					err.toString()
				);
				
				return;
			}
			console.log(D(), 'event confirmed'.blue, req.body.id);
			
			api_call(evt, res);
			
		});

		
	};

module.exports = exports = WebhookResponse;