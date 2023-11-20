const {Schema, model} = require('mongoose')

const PostScheme = new Schema({
    name: {type: String, require: true},
    prompt: {type: String, require: true},
    images: {type: Array, require: true},
})


module.exports = model('Post', PostScheme)