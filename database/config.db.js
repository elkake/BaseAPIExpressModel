import mongoose from 'mongoose'

const dbConnection = async () => {
  try {
    await mongoose.set('strictQuery',false)
    await mongoose.connect(process.env.MONGODB_CNN, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false
    })

    console.log('base de datos online')
  } catch (e) {
    console.log(e)
    throw new Error('Error en la bd, a la hora de iniciar la BD')
  }
}

export default dbConnection
