var config = require('../config.js'),
	libemail = require('./email.js'),
	D = require('./d.js');

module.exports = exports = function(hook, res, whTemplateData){
	
	whTemplateData.config = config;
	
	var stripe = require('stripe')(config.stripe.secret_key);
	
	stripe.customers.retrieve(hook.data.object.customer, HandleCustomerRetrieval);
	
	function HandleCustomerRetrieval(err, customer) {
		var msg_package = {
			to: customer.email,
			from: '"' + config.fromAddressName + '" ' 
				+ '<' + config.fromAddress + '>',	
			subject: whTemplateData.subject
		};
		
		whTemplateData.customerDescription = customer.description;
		
		libemail.templateSend(
			hook.type, 
			whTemplateData,
			msg_package,
			HandleTemplateSend
		);
	}
	
	function HandleTemplateSend(err, template){
		
		if(err)
		{
			console.log(
				D(), 
				hook.id,
				'templateSend ERROR'.red.bold.inverse,
				err
			);
			res.send(500, err);
			return;
		}
		
		console.log(D(), hook.id, 'success'.bold.blue);
		res.send(200);
	}
};