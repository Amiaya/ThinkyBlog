const express = require('express')
const categoryController = require('../controllers/categoryController')
const articleController = require('../controllers/articleController')
const authController = require('../controllers/authController')


const router = express.Router()

router.route('/category').post(categoryController.createCatgory).get(authController.protect,categoryController.getAllCategory)
router.route('/category/:catId/article').get(authController.protect, articleController.getArticleCategory)
router.route('/category/:id').get(categoryController.value)


module.exports = router