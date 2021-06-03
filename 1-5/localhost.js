// 保留（localhostをhttps化してやろうと立ち上げたもののブラウザに怒られて放置）
// Chromeのみで動作。Firefox→localhost:4040/inspect/httpのリンクへリダイレクトされてしまい確認できない。Safari→localhostサーバーとngrokサーバーの両方とも保存できない
const express = require('express');
const https = require('https');
const path = require('path');
const cfenv = require('cfenv');
const fs = require('fs');
const app = express();
const cors = require('cors');

const appEnv = cfenv.getAppEnv();
const httpsKey = {
  key: fs.readFileSync('./server_key.pem'),
  cert: fs.readFileSync('./server_crt.pem'),
};

app.use(express.static('public'));
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
  console.log('hello');
  const hostName = req.get('host');
  const cookieOption = {
    maxAge: 1000 * 60 * 5,
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
  };
  res.cookie('domain', hostName, cookieOption);
  res.sendFile(path.join(__dirname, '/public/cookie.html'));
});

https.createServer(httpsKey, app).listen(appEnv.port, () => {
  console.log('https://localhost:' + appEnv.port);
});
