"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
// import cors from 'cors';
const listenLog = debug_1.default('express');
;
const clientServer = (port) => {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static('dist/views'));
    app.use(express_1.default.static('dist/script'));
    // app.use(cors({ origin: true, credentials: true }));
    app.get('/client', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, 'views/cacheReq.html'));
    });
    app.listen(port, () => {
        listenLog(`clientServer: http://localhost:${port}/client`);
    });
    return;
};
exports.clientServer = clientServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50U2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vY2xpZW50U2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNEQUE4QjtBQUM5QixnREFBd0I7QUFDeEIsa0RBQTBCO0FBQzFCLDJCQUEyQjtBQUUzQixNQUFNLFNBQVMsR0FBRyxlQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFJbEMsQ0FBQztBQUNLLE1BQU0sWUFBWSxHQUFxQixDQUFDLElBQVksRUFBRSxFQUFFO0lBQzdELE1BQU0sR0FBRyxHQUFvQixpQkFBTyxFQUFFLENBQUM7SUFFdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUV2QyxzREFBc0Q7SUFFdEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtRQUNqRSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUNwQixTQUFTLENBQUMsa0NBQWtDLElBQUksU0FBUyxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPO0FBQ1QsQ0FBQyxDQUFDO0FBbkJXLFFBQUEsWUFBWSxnQkFtQnZCIn0=