const ngrok = require('ngrok'),
  express = require('express'),
  cors = require('cors'),
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

  ngrok.connect(port).then((url) => {
    app.listen(port, () => {
      // console.log(`appViewServer app listening at http://localhost:${port}`);
      console.log(`appPostReqServer: ${url}`);
    });
  });
};
