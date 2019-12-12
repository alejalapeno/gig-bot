import fetch from 'node-fetch';

// Receives context as first arg.
const sendMessage = (context, message, channel, ...additionalArgs) => {
	const { trigger_id } = context;
	let userInfo = {};
	let blocks, text;

	if(!channel) {
		channel = context.payload.view.private_metadata;
	}

	// chat.postMessage can use a plain text response or a Slack block response,
	// but they're under different keys in the response.
	if (typeof message === 'function') {
		blocks = message(context);
	} else {
		text = message;
	}

	return fetch('https://slack.com/api/chat.postMessage', {
		method: 'POST',
		body: JSON.stringify(Object.assign({
			trigger_id,
			channel,
			text,
			as_user: false,
			...blocks,
			...userInfo,
		}, ...additionalArgs)),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.SLACK_BOT_OAUTH_TOKEN}`,
		},
	});
};

export default sendMessage;
