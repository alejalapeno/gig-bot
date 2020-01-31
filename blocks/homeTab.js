// eslint-disable-next-line no-unused-vars
const homeTab = (context) => {
	return {
		'type': 'home',
		'blocks': [
			{
				'type': 'section',
				'text': {
					'type': 'mrkdwn',
					'text':
						"*How to use:*\nUsing the `/gig_bot` command in the channel you wish to post to will start off the process. It's that easy.\n\nYou'll be prompted to answer a few questions and Gig Bot will format and post to the channel for you.",
				},
			},
			{
				'type': 'divider',
			},
			{
				'type': 'section',
				'text': {
					'type': 'mrkdwn',
					'text':
						"*Shortcuts:*\n`/gig_bot looking` if you're looking for a gig.\n`/gig_bot offering` if you're posting a gig.",
				},
			},
			{
				'type': 'divider',
			},
			{
				'type': 'section',
				'text': {
					'type': 'mrkdwn',
					'text':
						"*Testing:*\nNot ready to post without previewing how I'll format your post first? Give me a try by DM'ing `/gig_bot` directly to me <@gig_bot>. I'll DM your post to you privately.",
				},
			},
			{
				'type': 'divider',
			},
			{
				'type': 'actions',
				'elements': [
					{
						'type': 'button',
						'text': {
							'type': 'plain_text',
							'text': 'Try me in a DM',
						},
						'style': 'primary',
						'value': 'tryMe',
					},
				],
			},
		],
	};
};

export default homeTab;
