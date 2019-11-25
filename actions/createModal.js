import fetch from 'node-fetch';

// Receives context as first arg.
const createModal = (context, view) => {
	const { trigger_id } = context;
	return fetch('https://slack.com/api/views.open', {
		method: 'POST',
		body: JSON.stringify({
			trigger_id,
			view: view(context),
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.SLACK_BOT_OAUTH_TOKEN}`,
		},
	});
};

export default createModal;
