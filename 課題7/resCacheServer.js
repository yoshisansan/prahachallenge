const ngrok = require('ngrok'),
  express = require('express'),
  cors = require('cors'),
  path = require('path');
  // cacheControl = require('express-cache-controller'),
  app = express();

module.exports = (port) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const corsOption = {
    origin: '*',
  };

  app.use(cors(corsOption));

  app.get('/cache-control', (req, res, next) => {
    console.log('cache-control');
    console.log(req.headers);
    res.set('Cache-Control', 'public, max-age=120');
    res.send('hai');
  });

  app.get('/last-modified', (req, res, next) => {
    console.log('cache-control');
    console.log('ヘッダー',req.headers);

    //ここでCache-Controlをセット
    res.header('Last-Modified', 'Fri, Jul 2021 07:28:00 GMT');
    res.send('hai');
  });

  app.get('/nensyuu.jpg', (req, res, next) => {
    console.log('Cachec-Control有 画像データ');
    res.set('Cache-Control', 'public, max-age=120');
    res.sendFile(path.join(__dirname, '/assets/nensyuu.jpg'));
  });

  app.get('/not-cache-control/nensyuu.jpg', (req, res, next) => {
    console.log('Cachec-Control無 画像データ');
    res.sendFile(path.join(__dirname, '/assets/nensyuu.jpg'));
  });

  ngrok.connect(port).then((url) => {
    app.listen(port, () => {
      // console.log(`appViewServer app listening at http://localhost:${port}`);
      console.log(`appPostReqServer: ${url}`);
    });
  });
};
