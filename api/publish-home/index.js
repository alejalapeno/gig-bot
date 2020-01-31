import fetch from 'node-fetch';
import homeTab from '../../blocks/homeTab';
import verifySlackSecretMiddleware from '../../shared-utilities/verifySlackSecretMiddleware';

const publishHome = async ({ body }, res) => {
	if (body.challenge) {
		res.send(body.challenge);
		return;
	}
	// Payload is just a string and needs to be parsed.
	const { event } = body;

	// Create a shared context.
	const context = {
		event,
	};

	await fetch('https://slack.com/api/views.publish', {
		method: 'POST',
		body: JSON.stringify({
			user_id: event.user,
			view: homeTab(context),
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.SLACK_BOT_OAUTH_TOKEN}`,
		},
	});

	// Tell Slack everything was A-Okay.
	res.end();
	return;
};

export default verifySlackSecretMiddleware(publishHome);
