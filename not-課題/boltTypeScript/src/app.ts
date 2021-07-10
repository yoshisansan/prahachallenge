import { App } from "@slack/bolt";


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN // add this
});

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  console.log(message);
  await say(`Hey there <@${message}>!`);
});

(async () => {
  // Start your app
  const portNum: any = process.env.PORT || 3000
  // type appStartType = [] | [portOrListenOptions: number | ListenOptions, httpsServerOptions?: ServerOptions];
  await app.start(portNum);

  console.log(`⚡️ Bolt app is running! ${portNum}`);
})();
