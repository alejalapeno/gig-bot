import fetch from 'node-fetch';
import sendMessage from './sendMessage';

// Receives context as first arg.
const sendDirectMessage = async (context, message, ...additionalArgs) => {
	const { channel } = await fetch(
		'https://slack.com/api/conversations.open',
		{
			method: 'POST',
			body: JSON.stringify({
				users: context.user.id,
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.SLACK_BOT_OAUTH_TOKEN}`,
			},
		},
	).then((response) => {
		return response.json();
	});

	await sendMessage(context, message, channel.id, ...additionalArgs);
};

export default sendDirectMessage;
