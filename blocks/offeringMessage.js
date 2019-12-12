const offeringMessage = (context) => {
	const {
		inputValues: {
			jobTitle,
			typeOfEmployement,
			isRemote,
			description,
			companyName,
			physicalLocation,
			url,
			salary,
		},
		userInfo: {
			icon_url,
			username,
		},
	} = context;

	const keywordTags = () => {
		let tagsArray = typeOfEmployement.map((type) => {
			return `\`[${type}]\``;
		});
		if (isRemote) {
			tagsArray.push(`\`[Remote]\``);
		}
		return tagsArray.join(' ');
	};

	const wrapInMarkdownObject = (text) => {
		return {type: 'mrkdwn', text };
	};

	// Slack only allows 5 max here.
	const fieldPairs = [
		{
			label: 'Company:',
			value: companyName,
		},
		{
			label: 'Location:',
			value: physicalLocation,
		},
		{
			label: 'URL:',
			value: url,
		},
		{
			label: 'Salary:',
			value: salary,
		},
	];

	let fields = [];

	fieldPairs.forEach((field) => {
		const {label, value} = field;
		if(value) {
			fields.push(wrapInMarkdownObject(label));
			fields.push(wrapInMarkdownObject(`*${value}*`));
		}
	});

	const blockquoteText = (text) => {
		return `>${text.split('\n').join('\n>')}`;
	}

	return {
		"blocks": [
			{
				"type": "divider"
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "*NEW GIG OFFER:*"
				}
			},
			{
				"type": "divider"
			},
			{
				"type": "section",
				"accessory": {
					"type": "image",
					"image_url": icon_url,
					"alt_text": "alt text for image"
				},
				"text": {
					"type": "mrkdwn",
					"text": `*${username}* (<@${context.payload.user.id}>) \n*${jobTitle}* — ${keywordTags()}`
				},
				fields
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": blockquoteText(description)
				}
			},
			{
				"type": "divider"
			},
			{
				"type": "context",
				"elements": [
					{
						"type": "mrkdwn",
						"text": "Created with the `/gig_bot` command"
					}
				]
			}
		]
	};
};

export default offeringMessage;
