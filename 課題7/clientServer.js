const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  app = express();

module.exports = (port) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('views'));
  app.use(express.static('script'));

  // app.use(cors({ origin: true, credentials: true }));

  app.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/cacheReq.html'));
  });

  app.listen(port, () => {
    console.log(`clientServer: http://localhost:${port}/client`);
  });
};
