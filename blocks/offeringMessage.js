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

	const textLines = [
		`*${jobTitle}* — ${keywordTags()}`,
		`${companyName ? `Company: ${companyName}` : ''}`,
		`${physicalLocation ? `Location: ${physicalLocation}` : ''}`,
		`${url ? `URL: ${url}` : ''}`,
		`Salary: ${salary}`,
		`${description ? `>${description}` : ''}`,
	];

	return {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": textLines.filter((line) => line !== '').join('\n')
				}
			}
		]
	};
};

export default offeringMessage;
