import { request, response } from 'express'
import Usuario from '../models/usuario.js'
import bcryptjs from 'bcryptjs'
import { generarJWT } from '../helpers/generarJWT.js'
import { googleVerify } from '../helpers/google-verify.js'

export const login = async (req = request, res = response) => {
  const { correo, password } = req.body

  try {
    //  verificar si el email existe
    const usuario = await Usuario.findOne({ correo })
    
    if (!usuario) {
      return res.status(400).json({
        msg: 'usuario/password no son correctos -correo'
      })
    }
    // si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'usuario/password no son correctos -estado false'
      })
    }
    // verificar la contraseña

    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'usuario/password no son correctos -password'
      })
    }
    // generar el jwt

    const token = await generarJWT(usuario.id)

    res.json({ usuario, token })
  } catch (e) {
    return res.status(500).json({
      msg: 'Hable con el admin'
    })
  }
}

export const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body

  try {
    const { nombre, imagen, correo } = await googleVerify(id_token)

    let usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ':P',
        imagen,
        google: true,
        rol: 'USER_ROLE'
      }
// crea ell usuario
      usuario = new Usuario(data)
      await usuario.save()
    }
// revisa el estado
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      })
    }

    // generara jwt
    const token = await generarJWT(usuario.id)

    res.json({
      usuario,
      token
    })
  } catch (error) {
    res.status(500).json({
      msg: 'el correo no se pudo validar'
    })
  }
}
