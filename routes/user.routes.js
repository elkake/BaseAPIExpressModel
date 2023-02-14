import { Router } from 'express'
import { check } from 'express-validator'
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut
} from '../controllers/user.js'
// import validar from '../middlewares/validar-campos.js'
import { esRolValido, emailExiste, idExiste } from '../helpers/db-validators.js'
// import { validarJWT } from '../middlewares/validar-jwt.js'
// import { tieneRole, validarRol } from '../middlewares/validar-roles.js'
import obj from '../middlewares/index.js'

const router = Router()

router.get('/', usuariosGet)

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idExiste),
    check('rol').custom(esRolValido),

    obj.validar
  ],
  usuariosPut
)

router.post(
  '/',
  [
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail().normalizeEmail(),
    check('password', 'El Password debe contener mas de 6 letras').isLength({
      min: 6
    }),
    check('correo').custom(emailExiste),
    // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    obj.validar
  ],
  usuariosPost
)

router.delete(
  '/:id',
  [
    obj.validarJWT,
    obj.validarRol,
    // tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idExiste),
    obj.validar
  ],
  usuariosDelete
)

router.patch('/:id', usuariosPatch)

export default router
