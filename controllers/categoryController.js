const Category = require('../models/category')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const Article = require('../models/articles')
exports.createCatgory = catchAsync(async(req,res,next) => {
    const category = await Category.create([
        {name: 'Category' },
        {name: 'Entertainment'},
        {name: 'Games'},
        {name: 'Internet'},
        {name: 'Technology'},
        {name: 'Society'}
    ])
    res.status(201).json({
        status:"successful",
        data:{
            category
        }
    })
})

exports.getAllCategory = catchAsync(async(req, res, next) => {
    const category = await Category.find()
    res.status(200).json({
        status:"successful",
        data:{
            category
        }
    })

})

exports.value = catchAsync(async(req, res, next) => {
    console.log(req.params.id)
    res.status(200).json({
        status:"successful",
    })

})