const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('assets'));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => {
  const hostName = req.get('host');
  const cookieOption = {
    domain: `.${hostName}`,
    maxAge: 1000 * 60 * 5,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  };
  res.cookie('domain', hostName, cookieOption);
  res.end();
});

// 画像をアップロードすると自動生成されたURLのものからでしか使えないため不要
// app.get('/nensyuu.jpg', (req, res) => {
//   res.sendFile(path.join(__dirname, '/assets/nensyuu.jpg'));
// });

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
