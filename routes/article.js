const express = require('express')
const articleController = require('../controllers/articleController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/article')
    .post(authController.protect, articleController.createArticle)
    .get(authController.protect, articleController.getArticle)

router.route('/article/:id')
.get(authController.protect, articleController.getOneArticle)

router.route('/article/:articleId/comment')
.post(authController.protect, articleController.createComment)
.get(authController.protect, articleController.getComments)
module.exports = router