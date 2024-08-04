"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessSocket = void 0;
const socket_io_1 = require("socket.io");
const redis_1 = require("./redis");
const sub = (0, redis_1.redis)();
const pub = (0, redis_1.redis)();
class ChessSocket {
    constructor(httpServer) {
        this._io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: '*'
            }
        });
        sub.subscribe('chess', (err, count) => {
            if (err) {
                console.error(err);
            }
        });
    }
    get io() {
        return this._io;
    }
    initListeners() {
        this._io.on('connect', socket => {
            console.log('user connected', socket.id);
        });
    }
    emit(room, payload) { }
    join(room) { }
    disconnect() {
        this._io.close();
    }
}
exports.ChessSocket = ChessSocket;
