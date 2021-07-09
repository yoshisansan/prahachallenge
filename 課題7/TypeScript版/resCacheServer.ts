import ngrok from 'ngrok';
import express from 'express';
import cors from 'cors';
import debug from 'debug';
import path from 'path';
const Log = debug('express');

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
    Log('cache-control');
    Log('ヘッダー',req.headers);

    //ここでCache-Controlをセット
    res.set('Cache-Control', 'public, max-age=120');
    res.send('hai');
  });

  app.get('/last-modified', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    Log('cache-control');
    Log('ヘッダー',req.headers);

    //ここでCache-Controlをセット
    res.header('Last-Modified', 'Fri, Jul 2021 07:28:00 GMT');
    res.send('hai');
  });

  app.get('/nensyuu.jpg', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    Log('Cachec-Control有 画像データ');
    res.set('Cache-Control', 'public, max-age=120');
    res.sendFile(path.join(__dirname, 'assets/nensyuu.jpg'));
  });

  app.get('/not-cache-control/nensyuu.jpg', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    Log('Cachec-Control無 画像データ');
    res.sendFile(path.join(__dirname, 'assets/nensyuu.jpg'));
  });

  ngrok.connect(port).then((url: string) => {
    app.listen(port, (): void => {
      Log(`resCacheServer: ${url}`);
    });
  });
};
