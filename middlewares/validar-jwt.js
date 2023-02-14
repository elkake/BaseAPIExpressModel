import jwt from 'jsonwebtoken'
import { request, response } from 'express'
import Usuario from '../models/usuario.js'

export const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

    const usuario = await Usuario.findById(uid)

    if (!usuario) {
      return res.status(404).json({ msg: 'El usuario no existe' })
    }

    if (!usuario.estado) {
      return res.status(401).json({ msg: 'El estado del token es false' })
    }

    req.usuario = usuario
    next()
  } catch (e) {
    console.log(e)
    res.status(401).json({
      msg: 'token no válido'
    })
  }
}
