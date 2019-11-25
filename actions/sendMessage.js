import fetch from 'node-fetch';

// Receives context as first arg.
const sendMessage = (context, message, asUser = false) => {
	const { trigger_id } = context;
	let blocks, text;
	// chat.postMessage can use a plain text response or a Slack block response,
	// but they're under different keys in the response.
	if (typeof message === 'function') {
		blocks = message(context);
	} else {
		text = message;
	}
	return fetch('https://slack.com/api/chat.postMessage', {
		method: 'POST',
		body: JSON.stringify({
			trigger_id,
			channel: process.env.GIG_CHANNEL_ID,
			text,
			...blocks,
			as_user: asUser,
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.SLACK_USER_OAUTH_TOKEN}`,
		},
	});
};

export default sendMessage;
