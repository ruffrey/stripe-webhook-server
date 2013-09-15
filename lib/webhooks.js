var config = require('../config.js'),
	customerEmail = require('./customer-email.js');

module.exports = exports = {
	charge: {
		dispute: {
			created: function(evt, res) {
				
				customerEmail(
					evt, res,  
					{
						subject: 'Important information about a charge dispute'
					}
				);
			},
			updated: function(evt, res) {
				
				customerEmail(
					evt, res,  
					{
						subject: 'Important information about a charge dispute'
					}
				);
			},
			closed: function(evt, res) {
				customerEmail(
					evt, res,  
					{
						subject: 'Important information about a charge dispute'
					}
				);
			}
		},
		
		failed: function(evt, res) {
			
			customerEmail(
				evt, res,  
				{
					subject: 'Charge Failed',
					amount: (evt.data.object.amount/100).toFixed(2),
					card_type: evt.data.object.card.type,
					card_last4: evt.data.object.card.last4,
					exp_month: evt.data.object.card.exp_month,
					exp_year: evt.data.object.card.exp_year,
					failure_message: evt.data.object.failure_message
				}
			);
			
		},
		
		refunded: function(evt, res) {
		
			customerEmail(
				evt, res,  
				{
					subject: 'Your refund receipt - refunded successfully',
					amount_refunded: (evt.data.object.amount_refunded/100).toFixed(2),
					card_type: evt.data.object.card.type,
					card_last4: evt.data.object.card.last4,
					exp_month: evt.data.object.card.exp_month,
					exp_year: evt.data.object.card.exp_year
				}
			);
			
		},
		succeeded: function(evt, res) {
			
			customerEmail(
				evt, res,  
				{
					subject: 'Your purchase receipt',
					id: evt.data.object.id,
					amount: (evt.data.object.amount/100).toFixed(2),
					card_type: evt.data.object.card.type,
					card_last4: evt.data.object.card.last4
				}
			);
		
		}
	},
	customer: {
		subscription: {
			created: function(evt, res) {
				
				customerEmail(
					evt, res,  
					{
						subject: 'Subscription was created',
						plan_amount: (evt.data.object.plan.amount/100).toFixed(2),
						plan_name: evt.data.object.plan.name,
						plan_interval: evt.data.object.plan.interval,
						current_period_end: new Date(evt.data.object.current_period_end*1000)
							.toFormat('MMM D, YYYY')
					}
				);
			
			},
			deleted: function(evt, res) {
				
				customerEmail(
					evt, res,  
					{
						subject: 'Your subscription was deleted',
						plan_amount: (evt.data.object.plan.amount/100).toFixed(2),
						plan_name: evt.data.object.plan.name,
						plan_interval: evt.data.object.plan.interval,
						current_period_end: new Date(evt.data.object.current_period_end*1000)
							.toFormat('MMM D, YYYY')
					}
				);
				
			},
			
			updated: function(evt, res) {
				
				customerEmail(
					evt, res,  
					{
						subject: 'Your subscription was updated',
						plan_amount: (evt.data.object.plan.amount/100).toFixed(2),
						plan_name: evt.data.object.plan.name,
						plan_interval: evt.data.object.plan.interval,
						current_period_end: new Date(evt.data.object.current_period_end*1000)
							.toFormat('MMM D, YYYY')
					}
				);
			}
		}
	},
	
	invoice: {
		created: function(evt, res) {
			
			customerEmail(
				evt, res,  
				{
					subject: 'You have a new invoice',
					id: evt.data.object.id,
					total: evt.data.object.total / 100,
					amount_due: evt.data.object.amount_due / 100,
					lines: FixInvoiceAmounts(evt.data.object.lines.data)
				}
			);
		},
		updated: function(evt, res) {
			
			customerEmail(
				evt, res,  
				{
					subject: 'Your invoice has been updated',
					id: evt.data.object.id,
					total: evt.data.object.total / 100,
					amount_due: evt.data.object.amount_due / 100,
					lines: FixInvoiceAmounts(evt.data.object.lines.data)
				}
			);
		},
		payment_succeeded: function(evt, res) {
			
			customerEmail(
				evt, res,  
				{
					subject: 'Your recent invoice was paid',
					id: evt.data.object.id,
					total: evt.data.object.total / 100,
					amount_due: evt.data.object.amount_due / 100,
					lines: FixInvoiceAmounts(evt.data.object.lines.data)
				}
			);
		},
		payment_failed: function(evt, res) {
			
			customerEmail(
				evt, res,  
				{
					subject: 'Payment failed for your recent invoice',
					id: evt.data.object.id,
					total: evt.data.object.total / 100,
					amount_due: evt.data.object.amount_due / 100,
					lines: FixInvoiceAmounts(evt.data.object.lines.data)
				}
			);
			
		}
	},
	
	ping: function(evt, res) {
		console.log(D(), evt);
		res.send(200);
	}
};

// takes array of invoice lines and adjusts things for
// better templating output
function FixInvoiceAmounts(lns) {
	if(lns)
	{
		lns.forEach(function(v) {
			if(v.amount)
			{
				v.amount = v.amount/100;
			}
		});
	}
	return lns;
}
