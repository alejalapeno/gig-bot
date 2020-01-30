const lookingMessage = (context) => {
	const {
		inputValues: {
			role,
			typeOfEmployement,
			introduction,
			companyValues,
			location,
			url,
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

	const wrapInSectionObject = (fields) => {
		return { type: 'section', fields };
	};

	const wrapInMarkdownObject = (text) => {
		return { type: 'mrkdwn', text };
	};

	// Slack only allows 5 max here.
	const fieldPairs = [
		{
			label: 'Preferred Location:',
			value: `*${location}*`,
			valueCheck: location,
		},
		{
			label: "I'm looking for a company that has",
			value: oxfordConjunction(companyValues),
			valueCheck: companyValues.length,
		},
		{
			label: "I'm looking for work that is",
			value: oxfordConjunction(typeOfEmployement, 'and/or'),
			valueCheck: typeOfEmployement,
		},
		{
			label: "I'm looking for a new position as a(n)",
			value: oxfordConjunction(role, 'or'),
			valueCheck: role,
		},
		{
			label: 'Personal Site:',
			value: url,
			valueCheck: url,
		},
	];

	const fieldsAsSections = fieldPairs
		.filter(({ valueCheck }) => {
			if (valueCheck) {
				return true;
			}
			return false;
		})
		.map((field) => {
			const { label, value } = field;
			const fields = [
				wrapInMarkdownObject(label),
				wrapInMarkdownObject(value),
			];
			return wrapInSectionObject(fields);
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
					'text': '*NEW TALENT OFFER:*',
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
					}* (<@${id}>) \n${blockquoteText(introduction)}`,
				},
			},
			...fieldsAsSections,
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

export default lookingMessage;
