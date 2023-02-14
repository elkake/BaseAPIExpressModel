import express from 'express'
import cors from 'cors'
import router from '../routes/user.routes.js'
import dbConnection from '../database/config.db.js'
import routerAuth from '../routes/auth.routes.js'
class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    // Define ruta de mis usuarios
    this.usuariosPath = '/api/usuarios'
    this.authPath = '/api/auth'
    // Conectar a base de datos
    this.conectarDB()
    // Middlewares
    this.middlewares()
    // Rutas de mi aplicacion
    this.routes()
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(express.static('public'))
    // serializa objetos json
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes() {
    //en esta middleware se define  la ruta y en que carpeta estan
    this.app.use(this.authPath, routerAuth)
    this.app.use(this.usuariosPath, router)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor', this.port)
    })
  }
}

export default Server
