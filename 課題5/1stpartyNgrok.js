// 保留（localhostをhttps化してやろうと立ち上げたもののブラウザに怒られて放置）
// Chromeのみで動作。Firefox→localhost:4040/inspect/httpのリンクへリダイレクトされてしまい確認できない。Safari→localhostサーバーとngrokサーバーの両方とも保存できない
const express = require('express'),
  path = require('path'),
  app = express(),
  cors = require('cors'),
  port = 3000;

// cfenv = require('cfenv'),
// fs = require('fs'),
// const https = require('https');

// const appEnv = cfenv.getAppEnv();
// const httpsKey = {
//   key: fs.readFileSync('./server_key.pem'),
//   cert: fs.readFileSync('./server_crt.pem'),
// };

app.use(express.static('views'));
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  const headerOption = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Set-Cookie',
    'Access-Control-Allow-Methods': 'GET',
  };
  res.set(headerOption);
  next();
});

app.get('/', (req, res) => {
  const hostName = req.get('host');
  const cookieOption = {
    maxAge: 1000 * 60 * 5,
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
  };
  res.cookie('domain', hostName, cookieOption);
  res.sendFile(path.join(__dirname, '/views/cookie.html'));
});

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});

// https.createServer(httpsKey, app).listen(appEnv.port, () => {
//   console.log('https://localhost:' + appEnv.port);
// });
