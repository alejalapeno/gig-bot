import normalizeInputValues from '../utilities/normalizeInputValues';
import transformInputValues from '../utilities/transformInputValues';

const payloadDeterminations = (payload) => {
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
	return types[payload.type]();
};

export default payloadDeterminations;
