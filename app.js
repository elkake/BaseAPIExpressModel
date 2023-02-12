import dotenv from 'dotenv'
import Server from './models/server.js'
import mongoose from 'mongoose'
// import { fileURLToPath } from 'url'
// import { dirname } from 'path'

// const dirURL = dirname(fileURLToPath(import.meta.url))

dotenv.config()
mongoose.set('strictQuery', false)
const server = new Server()

server.listen()
