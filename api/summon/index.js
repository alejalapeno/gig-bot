import getAction from '../../actions/';
import introMessage from '../../blocks/introMessage';
import commandNotRecognizedMessage from '../../blocks/commandNotRecognizedMessage';
import verifySlackSecretMiddleware from '../../shared-utilities/verifySlackSecretMiddleware';

const summon = async ({ body }, res) => {
	// Get the text as actionName from the summon text, we will use it as a key for what action to perform.
	const { text: actionName, trigger_id } = body;

	const context = {
		trigger_id,
		body,
	};

	if (!actionName) {
		res.json(introMessage(context));
		return;
	}

	const action = getAction(context, actionName);

	if (!action) {
		res.json(commandNotRecognizedMessage(context));
		return;
	}

	await action();

	// Tell Slack everything was A-Okay.
	res.end();
	return;
};

export default verifySlackSecretMiddleware(summon);
