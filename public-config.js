var settings = {
	
	// relative to root of the application
	emailTemplateDir: 'templates/',
	emailTemplateExt: '.html',
	
	fromAddress: '',
	fromAddressName: '',
	supportAddress: '',
	sincerely: '',
	
	dateFormat: 'MM/DD/YYYY HH:MI PP',
	logDateFormat: "YYYYMMDD HH24MISS",
	
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
		
		settings.port = process.env.VCAP_APP_PORT || 3000;
		
		settings.appProtocol = "http://";
		settings.appdomain = "www.psychscribbles.com";
		settings.secureUrl = "https://psychscribbles.aws.af.cm";
		settings.apiUrl = "https://psychscribbles.aws.af.cm/api/1.0";
		
		settings.helpUrl = "http://www.psychscribbles.com/content/knowledge-base",
		
		/* Stripe */
		settings.stripe = {
			public_key: ''
		   ,secret_key: ''
		};
		
	break;
	
	//
	// acceptance
	//
	case "acpt": 
	
		settings.port = process.env.VCAP_APP_PORT || 3000;
		
		settings.appProtocol = "http://";
		settings.appdomain = "";
		settings.apiUrl = "";
		settings.secureUrl = "";
		settings.helpUrl = "",
		
		/* Stripe */
		settings.stripe = {
			public_key: ''
		   ,secret_key: ''
		};
		
	break;
	
	// 
	// local dev
	//
	default:
	
		settings.port = 3000;
		
		settings.appProtocol = "http://";
		settings.appdomain = "";
		settings.apiUrl = "";
		settings.secureUrl = "";
		settings.helpUrl = "",
	
		/* Stripe */
		settings.stripe = {
			public_key: ''
		   ,secret_key: ''
		};
		
}

module.exports = settings;
