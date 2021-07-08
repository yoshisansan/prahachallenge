const appViewPort = 4040;
const appPostReqPort = 4000;
const appViewServer = require('./appViewServer');
const appPostReqServer = require('./appPostReqServer');

appViewServer(appViewPort);
appPostReqServer(appPostReqPort);
