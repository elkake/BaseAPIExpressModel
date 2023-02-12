import dotenv from 'dotenv'
import Server from './models/server.js'
// import { fileURLToPath } from 'url'
// import { dirname } from 'path'

// const dirURL = dirname(fileURLToPath(import.meta.url))

dotenv.config()
const server = new Server()

server.listen()
