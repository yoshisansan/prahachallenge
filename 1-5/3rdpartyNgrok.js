const ngrok = require('ngrok'),
  express = require('express'),
  path = require('path'),
  cors = require('cors'),
  port = 8080,
  app = express();

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
app.get('/nensyuu.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/nensyuu.jpg'));
});

ngrok.connect(port).then((url) => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`Example app listening at ${url}`);
  });
});
