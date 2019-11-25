import Joi from '@hapi/joi';

const schema = {
	remote: Joi.boolean().required(),
	jobTitle: Joi.string().required(),
	companyName: Joi.string(),
	physicalLocation: Joi.string(),
	typeOfEmployement: Joi.array()
		.items(Joi.string())
		.required(),
	url: Joi.string().domain({ tlds: false }),
	salary: Joi.string().required(),
	description: Joi.string(),
};

const validateOffering = (inputValues) => {
	Joi.validate(inputValues, schema, (err) => {
		if (err) {
			throw err;
		}
	});

	return;
};

export default validateOffering;
