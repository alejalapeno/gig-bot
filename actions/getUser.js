import fetch from 'node-fetch';
import querystring from 'querystring';

// Receives context as first arg.
const getUser = (_, user) => {
	const query = {
		user,
		token: process.env.SLACK_BOT_OAUTH_TOKEN,
	}
	const params = querystring.stringify(query);
	return fetch(`https://slack.com/api/users.info?${params}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(res => res.json());
};

export default getUser;
