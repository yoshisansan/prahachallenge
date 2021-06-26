module.exports = (port) => {
  const ngrok = require('ngrok'),
    express = require('express'),
    cors = require('cors'),
    app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const corsAllAlow = {
    origin: '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
  const corsNotAlow = {
    origin: 'https://developer.mozilla.org/ja/',
  };
  const corsNotSimpleReq = {
    origin: 'http://localhost:4040',
    'Access-Control-Max-Age': 200,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Origin, Content-Type, Accept',
  };
  const corsNotAllowPreflight = {
    origin: 'https://developer.mozilla.org/ja/',
    'Access-Control-Max-Age': 200,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Origin, Content-Type, Accept',
  };

  const isPreflight = (req) => {
    const isOptionsStatus = req.method === 'OPTIONS',
      hasOriginHeader = req.headers['origin'];
    console.log(req.method);
    console.log(isOptionsStatus, hasOriginHeader);

    return isOptionsStatus && hasOriginHeader;
  };

  app.post('/simple-req', cors(corsAllAlow), (req, res) => {
    res.header('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    console.log(`
      appPostReqServerMsg: POSTリクエストを受け取りました
      path: /simple-req
    `);
    res.send(req.body);
  });

  app.post('/simple-req-cors', cors(corsNotAlow), (req, res) => {
    res.header('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    console.log('blocked CORS 処理');
    res.end();
  });

  app.options('/not-simple-req', (req, res) => {
    // corsオプションを外さないとpreflightを取得できない
    console.log(isPreflight(req));
    res.end();
  });

  app.post('/not-simple-req', cors(corsNotSimpleReq), (req, res) => {
    res.header('Content-Type', 'application/json');
    res.cookie(null);
    console.log(req.method);
    if(req.method === 'OPTIONS'){
      console.log(req.method);
    }
    console.log(`
      appPostReqServerMsg: POSTリクエストを受け取りました
      path: /not-simple-req
    `);
    res.json(req.body);
  });

  app.options('/not-simple-req-cors', cors(corsNotSimpleReq), (req, res) => {
    // preflightを取得できない
    console.log(isPreflight(req));
    res.end();
  });

  app.post('/not-simple-req-cors', cors(corsNotAllowPreflight), (req, res) => {
    res.header('Content-Type', 'application/json');
    console.log('blocked CORS 処理');
    res.end();
  });

  ngrok.connect(port).then((url) => {
    app.listen(port, () => {
      // console.log(`appViewServer app listening at http://localhost:${port}`);
      console.log(`appPostReqServer: ${url}`);
    });
  });
};
