import ngrok from 'ngrok';
import express from 'express';
import cors from 'cors';
import debug from 'debug';
const listenLog = debug('express');

interface resCacheServerType {
  (port: number): void
};
export const resCacheServer: resCacheServerType = (port) => {
  const app: express.Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const corsOption: ({[key: string]: string}) = {
    origin: '*',
  }

  app.use(cors(corsOption));

  app.get('/cache-control', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    listenLog('cache-control');
    listenLog('ヘッダー',req.headers);

    //ここでCache-Controlをセット
    res.set('Cache-Control', 'public, max-age=120');
    res.send('hai');
  });

  ngrok.connect(port).then((url: string) => {
    app.listen(port, (): void => {
      listenLog(`resCacheServer: ${url}`);
    });
  });
};
