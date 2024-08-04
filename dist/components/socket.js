"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessSocket = void 0;
const socket_io_1 = require("socket.io");
const redis_1 = require("./redis");
class ChessSocket {
    constructor(httpServer) {
        this._io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: '*'
            }
        });
        const redis_subscriber = (0, redis_1.redis)();
        redis_subscriber.subscribe('chess', (err, count) => {
            if (err) {
                console.error(err);
            }
        });
    }
    emit(room, payload) {
        this._io;
    }
    disconnect() {
        this._io.close();
    }
}
exports.ChessSocket = ChessSocket;
