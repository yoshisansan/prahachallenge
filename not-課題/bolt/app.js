const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // Socket対応する場合に使用
  // appToken: process.env.SLACK_APP_TOKEN,
  // socketMode: true,
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "よお、Calendly予約お助けbotやで"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "期日を指定してメンターセッションを予約する",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "button-test"
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "時間指定して直近１ヶ月の予約を確認する",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "actionId-2"
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "まるっと予約可能な時間を確認する",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "actionId-3"
				}
			]
		},
    {
			"type": "divider"
		},
	],
    text: `Hey there <@${message.user}>!`
  });
});

app.action("button-test", async ({ack, say}) => {
  await ack();
  await say(`Hello World`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();