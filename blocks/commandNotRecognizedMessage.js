// eslint-disable-next-line no-unused-vars
const commandNotRecognizedMessage = (context) => {
	const {
		body: { text },
	} = context;
	return {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": `:warning: Sorry!\n I don't recognize the \`/gig_bot ${text}\` command.`
				}
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "Try summoning me with just `/gig_bot` to receive a few options of how I can help."
				}
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "If you're trying to use a specific command check the spelling and try again!"
				}
			},
			{
				"type": "actions",
				"elements": [
					{
						"type": "button",
						"text": {
							"type": "plain_text",
							"text": "Delete this message"
						},
						"value": "delete"
					}
				]
			}
		]
	};
};

export default commandNotRecognizedMessage;
