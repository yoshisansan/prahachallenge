import express from 'express';
import path from 'path';
import debug from 'debug';
// import cors from 'cors';

const listenLog = debug('express');

interface clientServerType {
  (port: number): void
};
export const clientServer: clientServerType = (port: number) => {
  const app: express.Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('views'));
  app.use(express.static('script'));

  // app.use(cors({ origin: true, credentials: true }));

  app.get('/client', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'views/cacheReq.html'));
  });

  app.listen(port, () => {
    listenLog(`clientServer: http://localhost:${port}/client`);
  });

  return;
};
