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
},{strict:true})

console.log(UsuarioSchema.methods)
//envia todos los datos menos la contraseña
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject()
  return usuario
}

export default model('Usuario', UsuarioSchema)
