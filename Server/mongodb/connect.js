const mongoose = require('mongoose')

const connectDB = (url)=>{
    mongoose.set('strictQuery', true)
    mongoose.connect(url)
    .then(()=> console.log('Conexion exitosa a la base de datos'))
    .catch(()=> console.log('Fallo pinche menso baboso'))
}

module.exports = {
    connectDB
}