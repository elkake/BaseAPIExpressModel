import { Router } from 'express'
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut
} from '../controllers/user.js'

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', usuariosPost)

router.delete('/:id', usuariosDelete)

router.patch('/:id', usuariosPatch)

export default router
