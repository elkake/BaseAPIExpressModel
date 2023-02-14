import { request, response } from 'express'
import Usuario from '../models/usuario.js'
import bcryptjs from 'bcryptjs'
import {generarJWT} from '../helpers/generarJWT.js'

export const login = async (req = request, res = response) => {
  const { correo, password } = req.body

  try {
    //  verificar si el email existe
    const usuario = await Usuario.findOne({ correo })
    if(!usuario){
        return res.status(400).json({
            msg:'usuario/password no son correctos -correo'
        })
    }
    // si el usuario esta activo
    if(!usuario.estado){
        return res.status(400).json({
            msg:'usuario/password no son correctos -estado false'
        })
    }
    // verificar la contraseña

    const validPassword=bcryptjs.compareSync(password,usuario.password)
    if(!validPassword){
        return res.status(400).json({
            msg:'usuario/password no son correctos -password'
        })
    }
    // generar el jwt

    const token=await generarJWT(usuario.id)


    res.json({ usuario,token })
  } catch (e) {
    return res.status(500).json({
      msg: 'Hable con el admin'
    })
  }
}
