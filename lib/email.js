var debug = require('debug')('webhook-email');
var config = require('../config');
var nodemailer = require('nodemailer');
var templateDir = __dirname + '/../' + config.emailTemplateDir;
var fs = require('fs');
var Handlebars = require('handlebars');


exports = module.exports = function Email(config) {
	
	/**
	 *
	 */
	this.send = function (msgObj, callback) {
		
		TransportMessage(msgObj, function(err) {
			if(callback instanceof Function)
			{
				callback(err);
			}
		});
		
	};

	/**
	 *
	 */
	this.templateSend = function (templateName, templateData, msgObj, callback) {
		
		if(!(callback instanceof Function))
		{
			callback = function(err) {
				debug('ERROR templateSend', err);
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
	};

	/**
	 *
	 */
	this.TransportMessage = function (messageObject, callback) {
		
		if(messageObject.to.indexOf('<')==-1)
		{
			messageObject.to ='<'+messageObject.to+'>';
		}
		
		var transport = nodemailer.createTransport("SMTP", config.nodemailer );
		
		transport.sendMail(messageObject, sendMailCallback);
		
		function sendMailCallback(err, smtp_res) {
			
			if(err)
			{
				debug('sendMail error', err);
			}
				
			transport.close(function(er){
				if(er)
				{
					debug(
						'transport.close()', 
						er
					);
				}
				
				transport = null;
				
				callback(err);
				
			});
		}
		
	};

};
