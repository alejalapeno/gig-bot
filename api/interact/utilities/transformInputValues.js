/* eslint-disable no-use-before-define */
// Slack only offers limited input types, here we define transformations for inputs
// such as converting a plain text value into an array using comma separated values
// or converting a select value to a boolean.
const getTransformation = (name, value) => {
	const transformations = {
		isRemote: () => stringToBool(value),
		topTech: () => commaSeparatedStringToArray(value, 5),
		jobStack: () => commaSeparatedStringToArray(value, 8),
		companyValues: () => value.slice(0, 3),
	};
	return transformations[name] ? transformations[name]() : value;
};

const transformInputValues = (inputValues) => {
	Object.entries(inputValues).forEach(([name, value]) => {
		inputValues[name] = getTransformation(name, value);
	});

	return inputValues;
};

const stringToBool = (value) => {
	return value === 'true';
};

const commaSeparatedStringToArray = (value, limit) => {
	if (!value) {
		return [];
	}
	const entries = value.split(',', limit);
	const whitespaceTrimmedEntries = entries.map((entry) => entry.trim());
	return whitespaceTrimmedEntries;
};

export default transformInputValues;
