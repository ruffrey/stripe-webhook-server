var config = require('../config'),
	
	nodemailer = require('nodemailer'),

	templateDir = __dirname+'/../'+config.emailTemplateDir,
	
	fs = require('fs'),
	
	Handlebars = require('handlebars');


function send(msgObj, callback) {
	
	TransportMessage(msgObj, function(err) {
		if(callback instanceof Function)
		{
			callback(err);
		}
	});
	
}
exports.send = send;

function templateSend(templateName, templateData, msgObj, callback) {
		
	if(!(callback instanceof Function))
	{
		callback = function(err) {
			console.log('ERROR templateSend', err);
		};
	}	
	
	fs.readFile(templateDir + templateName + config.emailTemplateExt, 'utf8', readFileCallback);
	
	function readFileCallback(err, uncompiledTemplate) {
		if(err)
		{
			return callback(err);
		}
		
		try{
			compiledTemplate = Handlebars.compile(uncompiledTemplate);
		}
		catch(er) {
			return callback(er);
		}
		
		msgObj.html = compiledTemplate(templateData);
		
		send(msgObj, callback);
	}
}
exports.templateSend = templateSend;

function TransportMessage(messageObject, callback) {
	
	if(messageObject.to.indexOf('<')==-1)
	{
		messageObject.to ='<'+messageObject.to+'>';
	}
	
	var transport = nodemailer.createTransport("SMTP", config.nodemailer );
	
	transport.sendMail(messageObject, sendMailCallback);
	
	function sendMailCallback(err, smtp_res) {
		
		if(err)
		{
			console.log('sendMail error'.red.bold, err);
		}
			
		transport.close(function(er){
			if(er)
			{
				console.log(
					'transport.close()'.red.bold, 
					er
				);
			}
			
			transport = null;
			
			callback(err);
			
		});
	}
	
};
exports.TransportMessage = TransportMessage;
