const offeringMessage = (context) => {
	const {
		inputValues: {
			jobTitle,
			thumbnailURL,
			typeOfEmployment,
			isRemote,
			description,
			companyName,
			physicalLocation,
			jobStack,
			url,
			salary,
		},
		user: {
			id,
			profile: { display_name, real_name },
		},
	} = context;

	const oxfordConjunction = (value, conjunction = 'and') => {
		let formatted = value.map((item) => {
			return `*${item}*`;
		});
		if (formatted.length > 1) {
			// Conjugate if more than one item
			formatted[formatted.length - 1] = `${conjunction} ${
				formatted[formatted.length - 1]
			}`;
		}
		if (formatted.length > 2) {
			// Oxford comma if more than 2 items
			formatted = formatted.join(', ');
		} else {
			// Space between if less than 2 items
			formatted = formatted.join(' ');
		}
		return formatted;
	};

	const keywordTags = () => {
		let tagsArray = typeOfEmployment.map((type) => {
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
			label: 'Stack includes:',
			value: oxfordConjunction(jobStack),
			valueCheck: jobStack.length,
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

	const accessory = thumbnailURL
		? {
				'type': 'image',
				'image_url': thumbnailURL,
				'alt_text': 'thumbnail',
		  }
		: undefined;

	return {
		'attachments': [
			{
				'color': '#3AAE84',
				'blocks': [
					{
						'type': 'divider',
					},
					{
						'type': 'section',
						'text': {
							'type': 'mrkdwn',
							'text': '*Now Hiring*',
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
						accessory,
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
			},
		],
	};
};

export default offeringMessage;
