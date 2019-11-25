import verifySlackSecret from './verifySlackSecret.js';
import { text } from 'micro';

const verifySlackSecretMiddleware = (fn) => {
	return async (req, res) => {
		const rawBody = await text(req);
		verifySlackSecret(req.headers, rawBody);
		return fn(req, res);
	};
};

export default verifySlackSecretMiddleware;
