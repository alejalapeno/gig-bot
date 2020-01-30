import getUser from './utilities/getUser';
import getAction from '../../actions/';
import payloadDeterminations from './utilities/payloadDeterminations';
import verifySlackSecretMiddleware from '../../shared-utilities/verifySlackSecretMiddleware';

const interact = async ({ body: { payload } }, res) => {
	// Payload is just a string and needs to be parsed.
	payload = JSON.parse(payload);
	const { trigger_id, response_url } = payload;

	// Derive these values from the payload depending on type.
	const { actionName, inputValues, messageURL } = payloadDeterminations(
		payload,
	);
	const { user } = await getUser(payload.user.id);

	// Create a shared context our actions can use.
	const context = {
		trigger_id,
		response_url,
		payload,
		inputValues,
		messageURL,
		user,
	};

	// Lookup and perform the relevant action.
	const action = getAction(context, actionName);
	await action();

	// Tell Slack everything was A-Okay.
	res.end();
	return;
};

export default verifySlackSecretMiddleware(interact);
