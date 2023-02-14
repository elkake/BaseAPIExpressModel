import { response, request } from 'express'
import Usuario from '../models/usuario.js'
import bcryptjs from 'bcryptjs'

export const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query
  // falta validar que sean numero y no letras
  // los async await son codigo bloqueante, en caso una tarde la otra await no se ejecuta
  // const usuarios = await Usuario.find({ estado: true })
  //   .skip(Number(desde))
  //   .limit(Number(limit))

  // const total = await Usuario.countDocuments({ estado: true })

  // promise.all ejecuta los codigos de forma simultanea y tarda menos tiempo
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limit))
  ])
  res.json({ total, usuarios })
}

export const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params
  const { _id, password, google, correo, ...resto } = req.body

  // TODO validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync(10)
    resto.password = bcryptjs.hashSync(password, salt)
  }
  // Encuentra por ID y actualiza, recibe id y el objeto que actualizado
  const usuario = await Usuario.findByIdAndUpdate(id, resto)

  res.json(usuario)
}

export const usuariosPost = async (req = request, res = response) => {
  // al desestructurar ignoramos todo lo demas que no sea lo que queremos
  const { nombre, correo, password, rol } = req.body
  const usuario = new Usuario({ nombre, correo, rol })
  // encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10)
  usuario.password = bcryptjs.hashSync(password, salt)
  // Guardar en bd
  await usuario.save()
  //response
  res.json(usuario)
}

export const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params

  const usuario = req.usuario
  // borrar fisicamente
  // const usuarioDelete = await Usuario.findByIdAndDelete(id)

  // recomendado ocultar el usuario en vez de borrarlo, en caso tenga datos importantes

 
    const usuarioUpdate = await Usuario.findByIdAndUpdate(id, { estado: false })
     
  res.json({usuarioUpdate,usuario})
}

export const usuariosPatch = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'patch API'
  })
}
