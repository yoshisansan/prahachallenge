// Glitchという無料nodeサーバーサービス上のコード
// 1stパーティークッキー用のサーバー
// URL: https://spectacled-cloud-slash.glitch.me/
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.static('views'));
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  const headerOption = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Set-Cookie',
    'Access-Control-Allow-Methods': 'GET',
  };
  req.set(headerOption);
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
  res.sendFile(path.join(__dirname, '/views/cookie.html'));
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
