import validar from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { tieneRole, validarRol } from '../middlewares/validar-roles.js'

const obj = {
  validar,
  validarJWT,
  tieneRole,
  validarRol
}

export default obj
