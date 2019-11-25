// Add "Import" suffix to our action imports so we can redefine them with context included.
import createModalImport from './createModal';
import clearMessageImport from './clearMessage';
import sendMessageImport from './sendMessage';
// Blocks
import offeringModal from '../blocks/offeringModal';
import lookingModal from '../blocks/lookingModal';
import offeringMessage from '../blocks/offeringMessage';
import lookingMessage from '../blocks/lookingMessage';

const getAction = (context, action) => {
	// Redefine our action functions that need context so we don't have to manually pass it on each time.
	const createModal = (...args) => createModalImport(context, ...args);
	const sendMessage = (...args) => sendMessageImport(context, ...args);
	const clearMessage = (...args) => clearMessageImport(context, ...args);

	const actionsList = {
		offering: async () => {
			await createModal(offeringModal);
			await clearMessage();
		},
		looking: async () => {
			await createModal(lookingModal);
			await clearMessage();
		},
		delete: async () => {
			await clearMessage();
		},
		offeringSubmit: async () => {
			await sendMessage(offeringMessage, true);
		},
		lookingSubmit: async () => {
			await sendMessage(lookingMessage, true);
		},
	};

	return actionsList[action];
};

export default getAction;
