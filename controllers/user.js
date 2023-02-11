import { response, request } from 'express'

export const usuariosGet = (req = request, res = response) => {
  const query = req.query

  res.json({
    ok: true,
    msg: 'get API',
    query
  })
}

export const usuariosPut = (req = request, res = response) => {
  const { id } = req.params
  res.json({
    ok: true,
    msg: 'put API',
    id
  })
}

export const usuariosPost = (req = request, res = response) => {
  // al desestructurar ignoramos todo lo demas que no sea lo que queremos
  const { nombre, edad } = req.body

  res.json({
    ok: true,
    msg: 'post API',
    nombre,
    edad
  })
}

export const usuariosDelete = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'delete API'
  })
}

export const usuariosPatch = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'patch API'
  })
}
