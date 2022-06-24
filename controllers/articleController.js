const Article = require('../models/articles')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Category = require('../models/category')
const Comment = require('../models/comment')
const  mongoose = require('mongoose')






exports.createArticle = catchAsync(async(req, res, next) => {
    const name= await Category.findOne({name: req.body.category_name, _id: req.body.categoryId})
    if(!name){
        return next(new AppError('The article must belong to a category', 401))
    }
    const article = await Article.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.user._id,
        category_name: req.body.category_name,
        categoryId: req.body.categoryId
    })
    res.status(201).json({
        status: 'successful',
        data:{
            article
        }
    })
})

exports.getArticle =  catchAsync(async (req,res, next) => {
    const num = Object.keys(req.query).length
    let article
    if(num !== 0){
        article = await Article.find({ title: { $regex: req.query.search, $options: "i" } })
    }else{
        article = await Article.find()
    }
    
    
    res.status(200).json({
        status: 'successful',
        result: article.length,
        data:{
            article
        }
    })
})

exports.getOneArticle = catchAsync(async(req,res,next) => {
    
    const article = await Article.findById(req.params.id)   
    if(!article){
        return next(new AppError("No document with this ID found", 404))
    }
    res.status(200).json({
        status: 'successful',
        data:{
            article
        }
    })
})

exports.getArticleCategory = catchAsync(async(req,res, next)=>{
    const article = await Article.find({categoryId: req.params.catId})
    if(article.length === 0){
        return next(new AppError("No document with this ID found", 404))
    }
    res.status(200).json({
        status:"successful",
        data:{
            article
        }
    })
})


exports.createComment = catchAsync(async(req,res,next) => {
    const article = await Article.findById(req.params.articleId)
    if(article.length === 0){
        return next(new AppError("No document with this ID found", 404))
    }
    const comment = await Comment.create({
        userId: req.user._id,
        articleId: req.params.articleId,
        comment: req.body.comment
    })
    const count = await Comment.aggregate([
       {
        $match: {articleId: mongoose.Types.ObjectId(req.params.articleId)}
       },
       {
        $count: "comment_count"
        }
    ])
    res.status(201).json({
        status:"successful",
        data:{
            comment,
            count
        }
    })

})

exports.getComments = catchAsync(async(req,res,next) => {
    let value
    if (req.params.sort === "Newest"){
        value = 1
    }
    else{
        value = -1
    }
    const count = await Comment.aggregate([
        {
            $match: {articleId: mongoose.Types.ObjectId(req.params.articleId)}
        
        },
        {
            $count: "comment_count"
        },
        {
            $sort: {'createdAt': value}
        }
    ])
    const comment = await Comment.aggregate([
        {
            $match: {articleId: mongoose.Types.ObjectId(req.params.articleId)}
        
        },
        {
            $sort: {'createdAt': value}
        }
    ])
    res.status(201).json({
        status:"successful",
        data:{
            comment,
            count
        }
    })

})