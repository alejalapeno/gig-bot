import getAction from '../../actions/';
import normalizeInputValues from './utilities/normalizeInputValues';
import transformInputValues from './utilities/transformInputValues';
import verifySlackSecretMiddleware from '../../shared-utilities/verifySlackSecretMiddleware';

const interact = async ({ body: { payload } }, res) => {
	// Payload is just a string and needs to be parsed.
	payload = JSON.parse(payload);
	const { trigger_id, response_url } = payload;
	let actionName, inputValues;

	// View submissions are determined by a type in the payload rather than an action because who cares about a consistent API.
	if (payload.type === 'view_submission') {
		// Get the callback_id as actionName from the view, we will use it as a key for what action to perform.
		actionName = payload.view.callback_id;
		inputValues = normalizeInputValues(payload.view.state.values);
		inputValues = transformInputValues(inputValues);
	} else if (payload.actions) {
		// Get the value as actionName from the action, we will use it as a key for what action to perform.
		actionName = payload.actions[0].value;
	}

	// Create a shared context our actions can use.
	const context = {
		trigger_id,
		response_url,
		payload,
		inputValues,
	};

	// Lookup and perform the relevant action.
	const action = getAction(context, actionName);
	await action();

	// Tell Slack everything was A-Okay.
	res.end();
	return;
};

export default verifySlackSecretMiddleware(interact);
