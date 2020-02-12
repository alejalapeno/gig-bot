const normalizeInputValues = (values) => {
	const inputValuesArray = Object.entries(values).map((input) => {
		// The values come in the following obtuse structure so we want to normalize them to {inputName: inputValue}.
		// IMPORTANT: The "action_id" and "block_id" should be the same value to make this work.
		// [
		//		'inputName',
		//		{
		//			inputName: {...}
		//		}
		// ]
		const inputName = input[0];
		const inputData = input[1][inputName];

		// The values we're after change location depending on the input type.
		const dataTypes = {
			plain_text_input: () => inputData.value,
			multi_static_select: () => {
				if (!inputData.selected_options) {
					return [];
				}
				return inputData.selected_options.map((selected) => {
					return selected.value;
				});
			},
			static_select: () => inputData.selected_option.value,
			checkboxes: () => {
				if (!inputData.selected_options) {
					return [];
				}
				return inputData.selected_options.map((selected) => {
					return selected.value;
				});
			},
		};
		const inputValue = dataTypes[inputData.type]();

		return { [inputName]: inputValue };
	});
	const inputValues = Object.assign(...inputValuesArray);

	return inputValues;
};

export default normalizeInputValues;
