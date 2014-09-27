var config = {

	// application settings
	port: process.env.PAASTOR_PORT || process.env.PORT || 3000,
	appProtocol: "http://",
	appdomain: "127.0.0.1",
	helpUrl: "http://change.this.com/support",
	webhookEndpointPath: '/',

	// stripe
	stripe: {
		public_key: '',
		secret_key: ''
	},

	// email templates
	emailTemplateDir: 'templates/', // relative to root of the application
	emailTemplateExt: '.html',
	
	// email template fields
	fromAddress: '',
	fromAddressName: '',
	supportAddress: '',
	sincerely: '',
	
	// settings for Nodemailer email module
	nodemailer: {
		service: "",
		generateTextFromHTML: true,
		auth: {
			user: "",
			pass: ""
		},
		//validateRecipients: true,
		//debug: true,
		maxConnections: 1
	}
};

// Environment Specific Settings
switch(process.env.NODE_ENV) {
	
	// 
	// Production
	//
	case "prod":
		
		config.port = process.env.PAASTOR_PORT || 3000;
		
		config.appProtocol = "https://";
		config.appdomain = "paastor.com";
		config.helpUrl = "https://paastor.com/pages/docs.html",
		
		/* Stripe */
		config.stripe = {
			public_key: '',
			secret_key: ''
		};
		
	break;
		
}

module.exports = config;
