const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const body_parser = require('body-parser');

dotenv.config()

const imagesAi_routes = require('./routes/imagesAi')
const post_routes = require('./routes/post')
const Conexion = require('./mongodb/connect')

const app = express()
const bodyParserJson = body_parser.json({limit: '50mb'});
const bodyParserUrlEncode = body_parser.urlencoded({limit:'50mb',extended:true})

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParserUrlEncode)
app.use(bodyParserJson)

app.use('/api', imagesAi_routes)
app.use('/api', post_routes)

app.get('/', async(req, res)=>{
    res.status(200).json({
        message: 'hola mundo'
    })
})


const startServer = () =>{
    try {
        Conexion.connectDB(process.env.MONGODB_URL)
        app.listen(process.env.PORT,()=>{
            console.log(`Escuchando en el puerto ${process.env.PORT}`);
        })
        
    } catch (error) {
        console.log(error)
    }

}

startServer()