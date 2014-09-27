# stripe-webhook-server

This is a standalone scaffold or middleware for responding to [Stripe webhooks](https://stripe.com/docs/webhooks). 

By default it sends emails upon receiving a webhook. You can reprogram it to do whatever. It's mean to be an example of how to implement Stripe webhooks in Node, but you can deploy it as-is for a webhook MVP.

There is no user interface. [Postman REST Client](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en) is a great tool for local webhook development.

## Prerequisites

- You have a [Stripe](https://stripe.com) account.
- You're running [Node.js](http://nodejs.org) >= 8.x.x
- You are storing the customer's email address in the Stripe `email` field. Otherwise the emails won't work!

## Usage - Standalone service

	$  git clone https://github.com/ruffrey/stripe-webhook-server
	$  cd stripe-webhook-server
	$  npm install

(or, fork it, then clone your own)

Edit `config.example.js` to suit your needs and rename it to `config.js`.

	$  npm start

to run the server.


## Usage - Connect or Express middleware

	$  npm install stripe-webhook-server

Then bind the middleware to a route. You must pass some configuration options.


```javascript
var app = require('express')();
var webhooks = require('stripe-webhook-server');
var config = {

	// application settings
	port: process.env.PORT || 3000,
	appProtocol: "http://",
	appdomain: "localhost",
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

// setup the route
app.post('/my-webhook-endpoint', webhooks.webhookServer(config));

```

## Customization

Email templates use Handlebars and are at `templates/`.

`lib/webhooks.js` is a list of the webhooks you support.

If you don't want to respond to a webhook, leave the function empty, or just delete the entry completely.

If you have custom application logic, you would edit `lib/webhooks.js`. This project is really more of a scaffold than a module, in that respect.


## Modules

- [Express 3](http://expressjs.com)
- [Nodemailer](https://github.com/andris9/Nodemailer) for sending email.
	- The `config.nodemailer` options are passed directly to the Nodemailer module.
- [Handlebars](http://handlebarsjs.com) for email templates

## Shameless plug

Check out [Paastor](https://paastor.com) for painless Node.js deployments - to your own server. For example, you can have stripe-webhook-server deployed in a few minutes using Paastor.

## Bugs

Please branch, fix, and submit pull request.

## Legal

(c) 2014 Jeff Parrish

Not affiliated with Stripe.

MIT License
