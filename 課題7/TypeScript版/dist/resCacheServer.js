"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resCacheServer = void 0;
const ngrok_1 = __importDefault(require("ngrok"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
const Log = debug_1.default('express');
;
const resCacheServer = (port) => {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    const corsOption = {
        origin: '*',
    };
    app.use(cors_1.default(corsOption));
    app.get('/cache-control', (req, res, next) => {
        Log('cache-control');
        Log('ヘッダー', req.headers);
        //ここでCache-Controlをセット
        res.set('Cache-Control', 'public, max-age=120');
        res.send('hai');
    });
    app.get('/last-modified', (req, res, next) => {
        Log('cache-control');
        Log('ヘッダー', req.headers);
        //ここでCache-Controlをセット
        res.header('Last-Modified', 'Fri, Jul 2021 07:28:00 GMT');
        res.send('hai');
    });
    app.get('/nensyuu.jpg', (req, res, next) => {
        Log('Cachec-Control有 画像データ');
        res.set('Cache-Control', 'public, max-age=120');
        res.sendFile(path_1.default.join(__dirname, 'assets/nensyuu.jpg'));
    });
    app.get('/not-cache-control/nensyuu.jpg', (req, res, next) => {
        Log('Cachec-Control無 画像データ');
        res.sendFile(path_1.default.join(__dirname, 'assets/nensyuu.jpg'));
    });
    ngrok_1.default.connect(port).then((url) => {
        app.listen(port, () => {
            Log(`resCacheServer: ${url}`);
        });
    });
};
exports.resCacheServer = resCacheServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzQ2FjaGVTZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9yZXNDYWNoZVNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsc0RBQThCO0FBQzlCLGdEQUF3QjtBQUN4QixrREFBMEI7QUFDMUIsZ0RBQXdCO0FBQ3hCLE1BQU0sR0FBRyxHQUFHLGVBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUk1QixDQUFDO0FBQ0ssTUFBTSxjQUFjLEdBQXVCLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDekQsTUFBTSxHQUFHLEdBQW9CLGlCQUFPLEVBQUUsQ0FBQztJQUV2QyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVoRCxNQUFNLFVBQVUsR0FBOEI7UUFDNUMsTUFBTSxFQUFFLEdBQUc7S0FDWixDQUFBO0lBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUUxQixHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtRQUNwRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEIsc0JBQXNCO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDaEQsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBUSxFQUFFO1FBQzFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QixzQkFBc0I7UUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztRQUMxRCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBUSxFQUFFO1FBQ3hHLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDaEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQVEsRUFBRTtRQUMxSCxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDLENBQUMsQ0FBQztJQUVILGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7UUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBUyxFQUFFO1lBQzFCLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBOUNXLFFBQUEsY0FBYyxrQkE4Q3pCIn0=