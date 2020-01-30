import getUser from './utilities/getUser';
import getAction from '../../actions/';
import normalizeInputValues from './utilities/normalizeInputValues';
import transformInputValues from './utilities/transformInputValues';
import verifySlackSecretMiddleware from '../../shared-utilities/verifySlackSecretMiddleware';

const interact = async ({ body: { payload } }, res) => {
	// Payload is just a string and needs to be parsed.
	payload = JSON.parse(payload);
	const { trigger_id, response_url } = payload;

	const payloadDeterminations = (type) => {
		// These are functions since the objects they use don't exist on every payload,
		// Could be replaced with optional chaining once supported
		const types = {
			'view_submission': () => {
				return {
					// Get the callback_id as actionName from the view, we will use it as a key for what action to perform.
					actionName: payload.view.callback_id,
					inputValues: transformInputValues(
						normalizeInputValues(payload.view.state.values),
					),
				};
			},
			'message_action': () => {
				return {
					// Get the value as actionName from the callback_id, we will use it as a key for what action to perform.
					actionName: payload.callback_id,
					// Compose a link to the message the action was performed on since the API doesn't just provide this.
					messageURL: `https://${
						payload.team.domain
					}.slack.com/archives/${
						payload.channel.id
					}/p${payload.message_ts.split('.').join('')}`,
				};
			},
			'block_actions': () => {
				return {
					// Get the value as actionName from the action, we will use it as a key for what action to perform.
					actionName: payload.actions[0].value,
				};
			},
		};
		return types[type]();
	};

	const { actionName, inputValues, messageURL } = payloadDeterminations(
		payload.type,
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
