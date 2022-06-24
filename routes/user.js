const express = require('express')
const multer = require('multer')
const authController = require('./../controllers/authController')
const userController  = require('../controllers/userController')
const router = express.Router()


router.route('/signup').post(authController.signUp)
router.route('/login').post(authController.login)
router.route('/user/updateMe').patch(authController.protect,userController.UserImage, userController.resizeUserImage,userController.updateMe)
router.route('/user/profile').get(authController.protect, userController.getProfile)

module.exports = router