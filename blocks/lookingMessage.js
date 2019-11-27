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
	} = context;

	const oxfordConjunction = (value, conjunction = 'and') => {
		let formatted = value.map((item) => {
			return `*${item}*`;
		});
		if(formatted.length > 1) {
			// Conjugate if more than one item
			formatted[formatted.length - 1] = `${conjunction} ${formatted[formatted.length - 1]}`;
		}
		if(formatted.length > 2) {
			// Oxford comma if more than 2 items
			formatted = formatted.join(', ');
		} else {
			// Space between if less than 2 items
			formatted = formatted.join(' ');
		}
		return formatted;
	};

	const textLines = [
		`${introduction ? `>${introduction.split('\n').join('\n>')}` : ''}`,
		`${location ? `Preferred Location: *${location}*` : ''}`,
		`${companyValues.length ? `I'm looking for a company that has ${oxfordConjunction(companyValues)}` : ''}`,
		`I'm looking for work that is ${oxfordConjunction(typeOfEmployement, 'and/or')}`,
		`I'm looking for a new position as a(n) ${oxfordConjunction(role, 'or')}`,
		`${url ? `Personal Site: ${url}` : ''}`,
	];

	return {
		blocks: [
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: textLines.filter((line) => line !== '').join('\n'),
				},
			},
		],
	};
};

export default lookingMessage;
