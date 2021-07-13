// サーバー：https://slackpraha-iris-ounce.glitch.me
// サーバーのソースコード：https://glitch.com/edit/#!/slackpraha-iris-ounce
const { App } = require('@slack/bolt');
const getCalendlyRservationTime = require('./src/action/getCalendlyRservationTime');
require('dotenv').config();
const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/timezone'));
dayjs.extend(require('dayjs/plugin/utc'));
dayjs.tz.setDefault('Asia/Tokyo');
const today = dayjs(new Date()).tz().format('YYYY-MM-DD');
const afterWeek = dayjs(new Date()).tz().add(1, 'week').format('YYYY-MM-DD');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// ex: $timecheck 12:00 を監視
app.message(/\$timecheck\s*\d{1,2}:\d{2}/, async ({ message, say }) => {
  const reqMsg = message.text,
        regex =/\d{1,2}:\d{2}/,
        found = reqMsg.match(regex)[0],
        targetTime = found.replace(/^\d{1}:\d{2}$/, `0${found}`); // 0:00 ではなく 00:00 の形式で統一させるためのreplace

  if(found === undefined || null) await say('入力に間違いがあるやで。半角文字にしてくれや');
  const timecheck = await getCalendlyRservationTime(targetTime);

  await say(timecheck);
});

// ex: $reserve 2021-xx-xx 18:00 を監視
app.message(/\$reserve\s.*/, async ({ message, say }) => {
  // 処理待ち
  await say('準備中やで。');
});

// ex: $schedule 2021-xx-xx 2021-yy-yy を監視
app.message(/\$schedule\s.*/, async ({ message, say }) => {
  // 処理待ち
  await say('準備中やで。');
});

app.message('calendlybot', async ({ message, say }) => {

  await say({
	"blocks": [
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
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*使い方*"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*$timecheck 18:00*\n ↑直近１ヶ月における 18:00 の空き日程を確認する"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `*$reserve ${afterWeek} 18:00*\n ↑(※準備中)指定日程で予約する`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `*$schedule ${today} ${afterWeek}*\n ↑(※準備中)指定日程の空き状況を確認する`
			}
		},
    {
      type: "divider"
    }
	],
  text: `Hey there <@${message.user}>!`
  });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();