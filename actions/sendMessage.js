import fetch from 'node-fetch';
import getUser from './getUser';

// Receives context as first arg.
const sendMessage = async(context, message, asUser = false) => {
	const { trigger_id } = context;
	let userInfo = {};
	let blocks, text;
	// chat.postMessage can use a plain text response or a Slack block response,
	// but they're under different keys in the response.
	if (typeof message === 'function') {
		blocks = message(context);
	} else {
		text = message;
	}

	if(asUser) {
		const {user} = await getUser(context, context.payload.user.id);

		const {profile: {display_name, image_48: avatar}} = user;

		userInfo = {
			username: display_name,
			icon_url: avatar,
		}
	}

	return fetch('https://slack.com/api/chat.postMessage', {
		method: 'POST',
		body: JSON.stringify({
			trigger_id,
			channel: process.env.GIG_CHANNEL_ID,
			text,
			...blocks,
			...userInfo,
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.SLACK_BOT_OAUTH_TOKEN}`,
		},
	});
};

export default sendMessage;
