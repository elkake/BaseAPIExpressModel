import { Schema, model } from 'mongoose'

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  correo: {
    type: String,
    required: [true, 'El correo es Obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La Contraseña es Obligatorio']
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    required: [true, 'El rol es requerido'],
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

//modifica el formato de datos cuando se convierte en un objeto JSON y es enviado al cliente
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject()
  usuario.id = _id
  return usuario
}

export default model('Usuario', UsuarioSchema)
