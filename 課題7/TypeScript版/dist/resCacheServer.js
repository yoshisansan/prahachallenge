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
const listenLog = debug_1.default('express');
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
        listenLog('cache-control');
        listenLog('ヘッダー', req.headers);
        //ここでCache-Controlをセット
        res.set('Cache-Control', 'public, max-age=120');
        res.send('hai');
    });
    app.get('/last-modified', (req, res, next) => {
        listenLog('cache-control');
        listenLog('ヘッダー', req.headers);
        //ここでCache-Controlをセット
        res.header('Last-Modified', 'Fri, Jul 2021 07:28:00 GMT');
        res.send('hai');
    });
    ngrok_1.default.connect(port).then((url) => {
        app.listen(port, () => {
            listenLog(`resCacheServer: ${url}`);
        });
    });
};
exports.resCacheServer = resCacheServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzQ2FjaGVTZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9yZXNDYWNoZVNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsc0RBQThCO0FBQzlCLGdEQUF3QjtBQUN4QixrREFBMEI7QUFDMUIsTUFBTSxTQUFTLEdBQUcsZUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBSWxDLENBQUM7QUFDSyxNQUFNLGNBQWMsR0FBdUIsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUN6RCxNQUFNLEdBQUcsR0FBb0IsaUJBQU8sRUFBRSxDQUFDO0lBRXZDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWhELE1BQU0sVUFBVSxHQUE4QjtRQUM1QyxNQUFNLEVBQUUsR0FBRztLQUNaLENBQUE7SUFFRCxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBRTFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBRSxFQUFFO1FBQ3BHLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzQixTQUFTLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QixzQkFBc0I7UUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNoRCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQixFQUFFLEVBQUU7UUFDcEcsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNCLFNBQVMsQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLHNCQUFzQjtRQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO1FBQzFELEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxlQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQVMsRUFBRTtZQUMxQixTQUFTLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQW5DVyxRQUFBLGNBQWMsa0JBbUN6QiJ9