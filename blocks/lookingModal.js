// eslint-disable-next-line no-unused-vars
const lookingModal = (context) => {
	return {
		"type": "modal",
		"callback_id": "lookingSubmit",
		"title": {
			"type": "plain_text",
			"text": "Looking For A New Gig?"
		},
		"submit": {
			"type": "plain_text",
			"text": "Post"
		},
		"close": {
			"type": "plain_text",
			"text": "Cancel"
		},
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "plain_text",
					"text": ":wave: Hey there!\n\nAnswer a few questions for me and I'll post the perfect gig listing to the channel for you, as you!"
				}
			},
			{
				"type": "divider"
			},
			{
				"type": "input",
				"label": {
					"type": "plain_text",
					"text": "Introduction"
				},
				"element": {
					"type": "plain_text_input",
					"multiline": true,
					"max_length": 500,
					"action_id": "introduction"
				},
				"block_id": "introduction"
			},
			{
				"type": "input",
				"label": {
					"type": "plain_text",
					"text": "Preferred Location"
				},
				"element": {
					"type": "plain_text_input",
					"action_id": "location"
				},
				"optional": true,
				"block_id": "location"
			},
			{
				"type": "input",
				"label": {
					"type": "plain_text",
					"text": "What types of employement are you looking for?"
				},
				"element": {
					"type": "multi_static_select",
					"placeholder": {
						"type": "plain_text",
						"text": "Select all that apply"
					},
					"options": [
						{
							"text": {
								"type": "plain_text",
								"text": "full-time"
							},
							"value": "full-time"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "contract"
							},
							"value": "contract"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "part-time"
							},
							"value": "part-time"
						}
					],
					"action_id": "typeOfEmployement"
				},
				"block_id": "typeOfEmployement"
			},
			{
				"type": "input",
				"label": {
					"type": "plain_text",
					"text": "What type of role are you looking for?"
				},
				"element": {
					"type": "multi_static_select",
					"placeholder": {
						"type": "plain_text",
						"text": "Select all that apply"
					},
					"options": [
						{
							"text": {
								"type": "plain_text",
								"text": "manager"
							},
							"value": "manager"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "individual contributor"
							},
							"value": "individual contributor"
						}
					],
					"action_id": "role"
				},
				"block_id": "role" 
			},
			{
				"type": "input",
				"hint": {
					"type": "plain_text",
					"text": "Select up to 3"
				},
				"label": {
					"type": "plain_text",
					"text": "What are you looking for in a company?"
				},
				"optional": true,
				"element": {
					"type": "multi_static_select",
					"placeholder": {
						"type": "plain_text",
						"text": "Select up to 3"
					},
					"options": [
						{
							"text": {
								"type": "plain_text",
								"text": "a great culture"
							},
							"value": "a great culture"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "large projects"
							},
							"value": "large projects"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "leadership opportunities"
							},
							"value": "leadership opportunities"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "mentorship"
							},
							"value": "mentorship"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "new technologies"
							},
							"value": "new technologies"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "social impact"
							},
							"value": "social impact"
						}
					],
					"action_id": "companyValues"
				},
				"block_id": "companyValues" 
			},
			{
				"type": "input",
				"label": {
					"type": "plain_text",
					"text": "Personal Website"
				},
				"element": {
					"type": "plain_text_input",
					"placeholder": {
						"type": "plain_text",
						"text": "https://yoursite.com/"
					},
					"action_id": "url"
				},
				"optional": true,
				"block_id": "url"
			},
			{
				"type": "context",
				"elements": [
					{
						"type": "mrkdwn",
						"text": ":warning: Attachments and additional info can be added in a threaded message once this gig is posted!"
					}
				]
			}
		]
	}
	;
};

export default lookingModal;
