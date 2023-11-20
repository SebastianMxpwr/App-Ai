const dotenv = require('dotenv')
const { v2 } = require('cloudinary')
const Post  = require('../mongodb/models/post')

dotenv.config()

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const createPost =  async(req, res)=>{
    try {
        const {name, prompt, images} = req.body

        let imageUrls = []
        let i = 0
        for(let image of images){
            const uploadedImage = await v2.uploader.upload(image)
            imageUrls.push(uploadedImage.secure_url)
            i+=1
            if(i === images.length){
                const post = await Post.create({
                    name,
                    prompt,
                    images: imageUrls
                })

                res.status(200).json({success: true, post})
            }
        }
    } catch (error) {
        res.status(500).json({error})
    }
}


const getPost = async(req, res)=>{
    try {
        const posts = (await Post.find()).reverse()
        res.status(200).json({success: true, posts})
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    createPost,
    getPost
}