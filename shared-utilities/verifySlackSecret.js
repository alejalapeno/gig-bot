import crypto from 'crypto';
import timingSafeCompare from 'tsscmp';

const verifySlackSecret = (headers, rawBody) => {
	const signature = headers['x-slack-signature'];
	const ts = parseInt(headers['x-slack-request-timestamp'], 10);

	// Divide current date to match Slack ts format
	// Subtract 5 minutes from current time
	const fiveMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 5);

	if (ts < fiveMinutesAgo) {
		throw new Error('outdatedSignature');
	}

	const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET);
	const [version, hash] = signature.split('=');
	hmac.update(`${version}:${ts}:${rawBody}`);

	if (!timingSafeCompare(hash, hmac.digest('hex'))) {
		throw new Error('invalidSignature');
	}

	return true;
};

export default verifySlackSecret;
