import fetch from 'node-fetch';

// Receives context as arg
const clearMessage = ({ response_url }) => {
	// If there's no response_url then this won't work anyways.
	if (!response_url) {
		return true;
	}
	return fetch(response_url, {
		method: 'POST',
		body: JSON.stringify({
			delete_original: 'true',
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.SLACK_BOT_OAUTH_TOKEN}`,
		},
	});
};

export default clearMessage;
