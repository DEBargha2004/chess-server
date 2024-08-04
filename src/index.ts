import dotenv from 'dotenv'
import { redis } from './service/redis'
import express from 'express'
import { ChessSocket } from './service/socket'
import { createServer } from 'http'
import cors from 'cors'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const socket = new ChessSocket(httpServer)
const PORT = process.env.PORT ?? 8000

// middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: '*'
  })
)
socket.io.use((socket, next) => {
  const id = socket.handshake
  console.log('user id ', id)

  next()
})

//initialize socket listeners

socket.initListeners()

// routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
