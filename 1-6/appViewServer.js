module.exports = (port) => {
  const ngrok = require('ngrok'),
    express = require('express'),
    path = require('path'),
    cors = require('cors'),
    fetch = require('node-fetch'),
    app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('src/views'));
  app.use(express.static('src/script'));

  app.use(function (req, res, next) {
    req.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
  app.use(cors({ origin: true, credentials: true }));

  app.get('/simple-req', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/simpleReq.html'));
  });

  app.post('/simple-req-glitch', (req, res) => {
    const fetchOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      mode: 'cors',
      body: JSON.stringify({ test: 'hllo' }),
    };

    fetch('https://silken-dazzling-universe.glitch.me/simple-req', fetchOption)
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  });

  app.get('/not-simple-req', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/notSimpleReq.html'));
  });

  app.post('/not-simple-req', (req, res) => {
    console.log(req.body);
  });

  app.listen(port, () => {
    console.log(`appViewServer: http://localhost:${port}/simple-req`);
    console.log(`appViewServer: http://localhost:${port}/not-simple-req`);
  });
};
