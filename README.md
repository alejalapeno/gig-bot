# Gig Bot

Gig Bot is a Slack bot created to walk users through creating the perfect gig (job) post. Through a few simple interactions and question answering Gig Bot will format a post for the user and send the post to the appropriate channel as the user themselves.

## How to Use

### Commands

* `/gig_bot` will prompt the user with the options available.
 
* `/gig_bot [command]`
    + `offering` will open a modal window for posting a new gig.
    + `looking` will open a modal window for looking for a new gig.

## Contributing

Note: Having knowledge of the Slack API verbiage helps, but the goal of Gig Bots structure and this section is to simplify Slack interactions for development.

#### Where's the server?

Gig Bot is built leveraging Zeit Now's serverless deployment. It uses build time [helpers](https://zeit.co/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects) to wrap the exported function in something like a light Express.js server or Zeit's own [Micro](https://github.com/zeit/micro) server.

These builders are automagically applied to the `/api/**/index.js` exports becoming routes based on their directory name.

#### Context

`context` is a shared context object each route of the API creates in order to share information with blocks, actions, etc. This way Gig Bot can compose messages using the information Slack passes it like usernames, channel names, etc.

#### Block Functions

Slack uses what it calls the "[block kit](https://api.slack.com/block-kit)" to compose advanced content using JSON.

Gig Bot takes this a step further by putting the JSON into what we call "block functions" that are just functions passed `context` that return block kit objects. `context` is a shared context object each route of our API creates in order to share information with our blocks, actions, etc. This way Gig Bot can compose messages using the information Slack passes it like usernames, channel names, etc.

#### Actions

Slack communicates in too many different ways through single endpoints. So Gig Bot normalizes these communications into actions determined by the `actionName`.

* `/gig_bot` commands are all funneled through our `/summon` route so we use the `text` of the command as our `actionName`.
* Interacting with interactive components in a Gig Bot message will contain the `value` attribute of the interactive component that we set, so we use it as our `actionName`.
* Submitting a modal form will contain the `callback_id` of the form that we set so we use it as our `actionName`.

This allows us to setup a table of actions in `actions/actions.js` all called by the `text`,`value`, or `callback_id` we setup.

What do actions do? They're just functions for triggering other actions like sending a message or opening a modal.

#### Utility Actions

Gig Bot has some utility functions setup to simplify accomplishing things in Slack.

* `sendMessage(message, [asUser])`
    + `message` "block function"
    + `asUser` bool *(optional)*

Sends a message to the Gig channel. Ephemeral messages from Gig Bot should only be sent using the server response.

* `createModal(view)`
    + `view` "block function"

Opens a Slack modal window or "view" as Slack calls them.

* `clearMessage()`

Deletes an ephemeral message to the user. Can only be done if the trigger action came from the ephemeral message you wish to delete.

**NOTE:** The above functions all receive `context` as their first argument, but in `actions.js` are redefined to pass on `context` without having to do so manually.

#### Forms

Form data sent from Slack is formed... interestingly. When you compose a form block the `action_id` and `block_id` for an input **MUST** be the same value as each other.

Slack also only offers limited input types. If you wish to transform a plain text input

Slack also only offers limited input types, in `transformInputValues.js` we can define transformations for inputs such as converting a plain text value into an array using comma separated values or converting a select value to a boolean.

Received input values can be accessed when composing a block function from `context.inputValues` (if present);

#### Wait, so how do I contribute?

If you need to add new unsupported functionality you'll need to enhance Gig Bot with new functions or open a new request ticket.

If you want to add/edit new messages, modals, commands then editing/creating the relevant actions, block functions, and/or input transformations is all you need to do.

### Required Slack App Dashboard Settings

#### Required Scopes:
`bot`, `chat:write:bot`, `chat:write:user`, `commands`

#### Slash Commands:
Command: `/gig_bot`

Request URL: `[apiURL]/summon/`

#### Interactivity

Interactivity must be toggled `On`.

Request URL: `[apiURL]/interact/`

## TODO:

* Hookup input validators
    + Error responses back to slack per field
* Unit tests with mocked integration
* Integration tests (?)
* Server errors
    + Slack wants a 200 back as long as the request was received
    + Custom error message responses possible
    + External logging (we're serverless here)
