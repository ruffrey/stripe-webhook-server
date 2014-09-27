var Email = require('./email.js');
var debug = require('debug')('webhook-email');

exports = module.exports = function customerEmail(hook, res, whTemplateData){
	
	var config = whTemplateData.config;
	var stripe = require('stripe')(config.stripe.secret_key);
	var email = new Email(config);
	
	stripe.customers.retrieve(hook.data.object.customer, HandleCustomerRetrieval);
	
	function HandleCustomerRetrieval(err, customer) {
		var msg_package = {
			to: customer.email,
			from: '"' + config.fromAddressName + '" ' 
				+ '<' + config.fromAddress + '>',	
			subject: whTemplateData.subject
		};
		
		whTemplateData.customerDescription = customer.description;
		
		email.templateSend(
			hook.type, 
			whTemplateData,
			msg_package,
			HandleTemplateSend
		);
	}
	
	function HandleTemplateSend(err, template){
		
		if(err)
		{
			debug(
				hook.id,
				'ERROR: templateSend',
				err
			);
			res.send(500, err);
			return;
		}
		
		debug('success', hook.id);
		res.send(200);
	}
};
