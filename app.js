import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Server from './models/server.js'
dotenv.config()

const dirURL = dirname(fileURLToPath(import.meta.url))

const server = new Server()

server.listen()
