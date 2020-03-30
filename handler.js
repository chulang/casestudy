'use strict';

const AWS = require('aws-sdk'); //this is default in all lambda, no need to install
var sqs = new AWS.SQS({ region: 'ap-southeast-1' });

const AWS_ACCOUNT = process.env.ACCOUNT_ID;
const QUEUE_URL = `https://sqs.ap-southeast-1.amazonaws.com/${AWS_ACCOUNT}/MyQueue`; //this is the URL where we will send the messages

module.exports.hello = (event, context, callback) => {
	const params = {
		MessageBody: 'Hola',
		QueueUrl: QUEUE_URL
	};
  
  //send the message
	sqs.sendMessage(params, function(err, data) {
		if (err) {
			console.log('error:', 'Fail Send Message' + err);

			const response = {
				statusCode: 500,
				body: JSON.stringify({
					message: 'ERROR'
				})
			};

			callback(null, response);
		} else {
			console.log('data:', data.MessageId);

			const response = {
				statusCode: 200,
				body: JSON.stringify({
					message: data.MessageId
				})
			};

			callback(null, response);
		}
	});
};


module.exports.sqsHello = (event, context, callback) => {
	console.log('it was called');

	console.log(event);

	context.done(null, '');
}