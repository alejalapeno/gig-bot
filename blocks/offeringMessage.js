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
		user: {
			id,
			profile: { display_name, real_name },
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
		return { type: 'mrkdwn', text };
	};

	// Slack only allows 5 max here.
	const fieldPairs = [
		{
			label: 'Company:',
			value: `*${companyName}*`,
			valueCheck: companyName,
		},
		{
			label: 'Location:',
			value: `*${physicalLocation}*`,
			valueCheck: physicalLocation,
		},
		{
			label: 'URL:',
			value: url,
			valueCheck: url,
		},
		{
			label: 'Salary:',
			value: `*${salary}*`,
			valueCheck: salary,
		},
	];

	let fields = [];

	fieldPairs.forEach((field) => {
		const { label, value, valueCheck } = field;
		if (valueCheck) {
			fields.push(wrapInMarkdownObject(label));
			fields.push(wrapInMarkdownObject(value));
		}
	});

	const blockquoteText = (text) => {
		return `>${text.split('\n').join('\n>')}`;
	};

	return {
		'blocks': [
			{
				'type': 'divider',
			},
			{
				'type': 'section',
				'text': {
					'type': 'mrkdwn',
					'text': '*NEW GIG OFFER:*',
				},
			},
			{
				'type': 'divider',
			},
			{
				'type': 'section',
				'text': {
					'type': 'mrkdwn',
					'text': `*${
						display_name ? display_name : real_name
					}* (<@${id}>) \n*${jobTitle}* — ${keywordTags()}`,
				},
				fields,
			},
			{
				'type': 'section',
				'text': {
					'type': 'mrkdwn',
					'text': blockquoteText(description),
				},
			},
			{
				'type': 'divider',
			},
			{
				'type': 'context',
				'elements': [
					{
						'type': 'mrkdwn',
						'text': 'Created with the `/gig_bot` command',
					},
				],
			},
		],
	};
};

export default offeringMessage;
