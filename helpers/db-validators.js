import Role from '../models/role.js'
import Usuario from '../models/usuario.js'

export const esRolValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol })
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
  }
}

// verificar si el correo existe
// finOne es un metodo de db.collection, busca el json que tenga el mismo correo y lo devuelve, si existe se cancela la app.
export const emailExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo })
  if (existeEmail) {
    throw new Error(`El ${correo} correo ya existe`)
  }
}


export const idExiste= async(id='')=>{
  const existeUsuario=await Usuario.findById(id)
  if(!existeUsuario){
    throw new Error(`El ${id} no existe`)
  }
}