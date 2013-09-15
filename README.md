# What this thing does

This is a scaffold for responding to [Stripe](https://stripe.com/docs/webhooks). 

By default it'll send some emails to customers for you. But you can reprogram it to do whatever, plotting world domination or something else.

There is no user interface in stripe-webhook-server - use [Stripe's website](https://stripe.com).

# Nickname

I get tired of typing `stripe-webhook-server` so it'll be referred to as `SWS`. It is not affiliated with the Swiss, Swiss cheese, Swiss army knives, etc. but pronouncing it 'swiss' is cool.

# Assumptions

- You have a [Stripe](https://stripe.com) account.
- You're running [Node.js](http://nodejs.org) >= 8.x.x
- You are storing the customer's email address in the email field. Otherwise the emails won't work!
- You are going to use one of Nodemailer's built in services.
- You like to wear silly hats (optional).

# Usage

`git clone` this repo.

Edit `public-config.js` to suit your needs and rename it to `config.js`.

`lib/webhooks.js` is a list of the webhooks you support. If you don't want to do anything with a webhook, leave the function empty or just delete the entry completely. SWS

You might want to take a look if you prefer not to send out the default  at Maybe even edit `lib/webhook-server.js`.

You are good to go for local dev. See the `/scripts/` folder for setting this thing up on a VPS.

# Modules in use

For your knowledge it's using these

- [Express 3](http://expressjs.com)
- [Nodemailer](https://github.com/andris9/Nodemailer) for sending email
- [Handlebars](http://handlebarsjs.com) for compiling templates

# Bugs

Please branch, fix, and submit pull request. 

# Legal

Copyright 2013 Jeff Parrish

No warranty expressed or implied.

MIT License

**NOT** officially affiliated with Stripe.

