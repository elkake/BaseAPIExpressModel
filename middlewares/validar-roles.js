import { response, request } from 'express'

// explicitamente tiene que ser ADMIN_ROLE
export const validarRol = async (req = request, res = response, next) => {
  // este middleware va despues de validar-jwt.js
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token primero'
    })
  }
  const usuario = req.usuario

  if (usuario.rol != 'ADMIN_ROLE') {
    return res
      .status(401)
      .json({ msg: 'Rol no aceptado para realizar esta tarea' })
  }

  next()
}

// Puede tener uno de los roles registrados detnro de la BD
export const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin validar el token primero'
      })
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: 'El servicio requiere uno de estos roles ' + roles
      })
    }
    next()
  }
}
