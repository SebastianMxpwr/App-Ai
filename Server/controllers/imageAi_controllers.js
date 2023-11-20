const { Configuration, OpenAIApi } = require('openai') ;
const dotenv = require('dotenv')


dotenv.config()

const configuration =  new Configuration({
    apiKey: process.env.OPENAI_API_KEY 
})

const openai = new OpenAIApi(configuration)


const createImage = async (req, res)=>{
    try {
        const {prompt} = req.body

        const aiResponse = await openai.createImage({
            prompt,
            n: 4,
            size: '1024x1024',
            response_format: 'b64_json'
        })

        let images = aiResponse.data.data.map(e=>{
            return ( 'data:image/jpeg;base64,' + e.b64_json)
        })

        res.status(200).send({
            images,
            prompt
        })
    } catch (error) {
        res.status(500).send({
            message: 'Algo salio mal',
            error: error.response.data || 'Algo ha salido mal'
        })
    }
}


module.exports = {
    createImage
}