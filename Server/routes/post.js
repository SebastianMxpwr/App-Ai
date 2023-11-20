const Post_controllers = require('../controllers/post_controllers')
const express = require('express')
const api = express()

api.get('/getPost', Post_controllers.getPost)
api.post('/createPost', Post_controllers.createPost)

module.exports = api