import { Server as SocketServer } from 'socket.io'
import { redis } from './redis'
import { createServer } from 'http'

const sub = redis()
const pub = redis()

export class ChessSocket {
  private _io: SocketServer
  constructor (httpServer: ReturnType<typeof createServer>) {
    this._io = new SocketServer(httpServer, {
      cors: {
        origin: '*'
      }
    })

    sub.subscribe('chess', (err, count) => {
      if (err) {
        console.error(err)
      }
    })
  }

  get io () {
    return this._io
  }

  public initListeners () {
    this._io.on('connect', socket => {
      console.log('user connected', socket.id)
    })
  }

  emit (room: string, payload: string) {}

  join (room: string) {}

  disconnect () {
    this._io.close()
  }
}
