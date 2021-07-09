const clientPort = 4040;
const resCachePort = 4000;
const clientServer = require('./clientServer');
const resCacheServer = require('./resCacheServer');

clientServer(clientPort);
resCacheServer(resCachePort);
