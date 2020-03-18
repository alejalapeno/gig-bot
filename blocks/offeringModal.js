// eslint-disable-next-line no-unused-vars
const offeringModal = (context) => {
	let channel_id;
	if (context.payload) {
		channel_id = context.payload.channel.id;
	} else {
		channel_id = context.body.channel_id;
	}
	return {
		'type': 'modal',
		'callback_id': 'offeringSubmit',
		'private_metadata': channel_id,
		'title': {
			'type': 'plain_text',
			'text': 'New Gig Offering',
		},
		'submit': {
			'type': 'plain_text',
			'text': 'Post',
		},
		'close': {
			'type': 'plain_text',
			'text': 'Cancel',
		},
		'blocks': [
			{
				'type': 'section',
				'text': {
					'type': 'plain_text',
					'text': `:wave: Hey there!\n\nAnswer a few questions for me and I'll post the perfect gig listing to the channel for you!`,
				},
			},
			{
				'type': 'divider',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'Job Title',
				},
				'element': {
					'type': 'plain_text_input',
					'action_id': 'jobTitle',
				},
				'block_id': 'jobTitle',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'Thumbnail Image URL',
				},
				'hint': {
					'type': 'plain_text',
					'text': 'Image will be cropped to 1:1 square ratio.',
				},
				'element': {
					'type': 'plain_text_input',
					'action_id': 'thumbnailURL',
					'placeholder': {
						'type': 'plain_text',
						'text':
							'Spice up your post with an image of your choice!',
					},
				},
				'optional': true,
				'block_id': 'thumbnailURL',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'Company Name',
				},
				'element': {
					'type': 'plain_text_input',
					'action_id': 'companyName',
				},
				'optional': true,
				'block_id': 'companyName',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'Physical Location',
				},
				'element': {
					'type': 'plain_text_input',
					'placeholder': {
						'type': 'plain_text',
						'text': 'City or Area',
					},
					'action_id': 'physicalLocation',
				},
				'optional': true,
				'block_id': 'physicalLocation',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'Type of Employment',
				},
				'element': {
					'type': 'checkboxes',
					'options': [
						{
							'text': {
								'type': 'plain_text',
								'text': 'Full-Time',
							},
							'value': 'Full-Time',
						},
						{
							'text': {
								'type': 'plain_text',
								'text': 'Contract',
							},
							'value': 'Contract',
						},
						{
							'text': {
								'type': 'plain_text',
								'text': 'Part-Time',
							},
							'value': 'Part-Time',
						},
					],
					'action_id': 'typeOfEmployment',
				},
				'block_id': 'typeOfEmployment',
			},
			{
				'type': 'input',
				'optional': true,
				'label': {
					'type': 'plain_text',
					'text': 'Is this a remote gig?',
				},
				'element': {
					'type': 'checkboxes',
					'options': [
						{
							'text': {
								'type': 'plain_text',
								'text': 'This gig is fully remote',
							},
							'value': 'true',
						},
					],
					'action_id': 'isRemote',
				},
				'block_id': 'isRemote',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text':
						'What are some technologies the position would use?',
				},
				'hint': {
					'type': 'plain_text',
					'text':
						"Separate each item with a comma 'AWS, Angular, CSS'\n 8 items maximum",
				},
				'element': {
					'type': 'plain_text_input',
					'action_id': 'jobStack',
				},
				'optional': true,
				'block_id': 'jobStack',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'URL',
				},
				'element': {
					'type': 'plain_text_input',
					'placeholder': {
						'type': 'plain_text',
						'text': 'https://yoursite.com/gig',
					},
					'action_id': 'url',
				},
				'optional': true,
				'block_id': 'url',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'Salary',
					'emoji': true,
				},
				'hint': {
					'type': 'plain_text',
					'text':
						'A number or range is best, but saying something here is required.',
				},
				'element': {
					'type': 'plain_text_input',
					'multiline': false,
					'placeholder': {
						'type': 'plain_text',
						'text': '$XXX',
					},
					'max_length': 22,
					'action_id': 'salary',
				},
				'block_id': 'salary',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'Description',
					'emoji': true,
				},
				'element': {
					'type': 'plain_text_input',
					'multiline': true,
					'max_length': 500,
					'action_id': 'description',
				},
				'block_id': 'description',
			},
			{
				'type': 'context',
				'elements': [
					{
						'type': 'mrkdwn',
						'text':
							':warning: Attachments and additional info can be added in a threaded message once this gig is posted!',
					},
				],
			},
		],
	};
};

export default offeringModal;
