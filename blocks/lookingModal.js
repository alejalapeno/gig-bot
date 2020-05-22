// eslint-disable-next-line no-unused-vars
const lookingModal = (context) => {
	let channel_id;
	if (context.payload) {
		channel_id = context.payload.channel.id;
	} else {
		channel_id = context.body.channel_id;
	}
	return {
		'type': 'modal',
		'callback_id': 'lookingSubmit',
		'private_metadata': channel_id,
		'title': {
			'type': 'plain_text',
			'text': 'Looking For A New Gig?',
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
					'text':
						":wave: Hey there!\n\nAnswer a few questions for me and I'll post the perfect gig listing to the channel for you!",
				},
			},
			{
				'type': 'divider',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'Introduction',
				},
				'element': {
					'type': 'plain_text_input',
					'multiline': true,
					'max_length': 1250,
					'action_id': 'introduction',
				},
				'block_id': 'introduction',
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
					'text': 'Preferred Location',
				},
				'element': {
					'type': 'plain_text_input',
					'action_id': 'location',
				},
				'optional': true,
				'block_id': 'location',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'What types of employment are you looking for?',
				},
				'element': {
					'type': 'checkboxes',
					'options': [
						{
							'text': {
								'type': 'plain_text',
								'text': 'full-time',
							},
							'value': 'full-time',
						},
						{
							'text': {
								'type': 'plain_text',
								'text': 'contract',
							},
							'value': 'contract',
						},
						{
							'text': {
								'type': 'plain_text',
								'text': 'part-time',
							},
							'value': 'part-time',
						},
					],
					'action_id': 'typeOfEmployment',
				},
				'block_id': 'typeOfEmployment',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'What type of role are you looking for?',
				},
				'element': {
					'type': 'checkboxes',
					'options': [
						{
							'text': {
								'type': 'plain_text',
								'text': 'individual contributor',
							},
							'value': 'individual contributor',
						},
						{
							'text': {
								'type': 'plain_text',
								'text': 'manager',
							},
							'value': 'manager',
						},
					],
					'action_id': 'role',
				},
				'block_id': 'role',
			},
			{
				'type': 'input',
				'hint': {
					'type': 'plain_text',
					'text': 'Select up to 3',
				},
				'label': {
					'type': 'plain_text',
					'text': 'What are you looking for in a company?',
				},
				'optional': true,
				'element': {
					'type': 'multi_static_select',
					'placeholder': {
						'type': 'plain_text',
						'text': 'Select up to 3',
					},
					'options': [
						{
							'text': {
								'type': 'plain_text',
								'text': 'a great culture',
							},
							'value': 'a great culture',
						},
						{
							'text': {
								'type': 'plain_text',
								'text': 'large projects',
							},
							'value': 'large projects',
						},
						{
							'text': {
								'type': 'plain_text',
								'text': 'leadership opportunities',
							},
							'value': 'leadership opportunities',
						},
						{
							'text': {
								'type': 'plain_text',
								'text': 'mentorship',
							},
							'value': 'mentorship',
						},
						{
							'text': {
								'type': 'plain_text',
								'text': 'new technologies',
							},
							'value': 'new technologies',
						},
						{
							'text': {
								'type': 'plain_text',
								'text': 'social impact',
							},
							'value': 'social impact',
						},
					],
					'action_id': 'companyValues',
				},
				'block_id': 'companyValues',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'What tech would you like to work with?',
				},
				'hint': {
					'type': 'plain_text',
					'text':
						"Separate each item with a comma 'PHP, Angular, CSS'\n 5 items maximum",
				},
				'element': {
					'type': 'plain_text_input',
					'action_id': 'topTech',
				},
				'optional': true,
				'block_id': 'topTech',
			},
			{
				'type': 'input',
				'label': {
					'type': 'plain_text',
					'text': 'Personal Website',
				},
				'element': {
					'type': 'plain_text_input',
					'placeholder': {
						'type': 'plain_text',
						'text': 'https://yoursite.com/',
					},
					'action_id': 'url',
				},
				'optional': true,
				'block_id': 'url',
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

export default lookingModal;
