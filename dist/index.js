"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const socket_1 = require("./service/socket");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const socket = new socket_1.ChessSocket(httpServer);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*'
}));
socket.io.use((socket, next) => {
    const id = socket.handshake;
    console.log('user id ', id);
    next();
});
//initialize socket listeners
socket.initListeners();
// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
