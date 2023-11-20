const Image_controllers = require('../controllers/imageAi_controllers')
const express = require('express')
const api = express()


api.post('/createImage', Image_controllers.createImage)

module.exports = api