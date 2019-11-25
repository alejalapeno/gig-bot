// eslint-disable-next-line no-unused-vars
const introMessage = (context) => {
	return {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": ":wave: Hey there!\n What are you looking to do?"
				}
			},
			{
				"type": "actions",
				"elements": [
					{
						"type": "button",
						"text": {
							"type": "plain_text",
							"text": "Offer a gig"
						},
						"value": "offering"
					},
					{
						"type": "button",
						"text": {
							"type": "plain_text",
							"text": "Look for a gig"
						},
						"value": "looking"
					}
				]
			}
		]
	};
};

export default introMessage;
