const multer = require('multer')
const sharp = require('sharp')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const User = require('../models/User')
const { findById } = require('../models/articles')
const Article = require('../models/articles')
const mongoose = require('mongoose')


// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/users' )
//     }, 
//     filename: (req,file,cb) => {
//         const ext = file.mimetype.split('/')[1]
//         cb(null, `user-${req.user._id}-${Date.now()}.${ext}`)
//     }
// })

const multerStorage = multer.memoryStorage()

const multerFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    } else{
        cb(new AppError('Not an image! Please upload only images', 400), false)
    }
}
const upload = multer({ 
    storage: multerStorage,
    fileFilter: multerFilter
})
exports.UserImage = upload.single('image')

exports.resizeUserImage = (req, res, next) => {
    if(!req.file) return next()
    
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`

    sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality: 90})
    .toFile(`public/img/users/${req.file.filename}`)


    next()
}

exports.getProfile = catchAsync(async(req,res,next) => {
    const user = await User.findById(req.user._id)
    user.password = undefined
    post_count = await Article.aggregate([
        {
            $match: {userId: mongoose.Types.ObjectId(req.user._id)}
        },
        {
            $count: "post_count"
        }

    ])
    res.status(200).json({
        status: "successful",
        data:{
            user,
            post_count
        }
    })
})

exports.updateMe = catchAsync(async(req,res,next) => {
    if(req.body.password){
        return next(new AppError("This route is not for update password"))
    }
    if(req.file) req.body.image = req.file.filename
    const UpdateUser = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true
    })
    
    if(!UpdateUser){
        return next(new AppError('No document found with that ID', 404))
    }
    UpdateUser.password = undefined
    res.status(200).json({
        status: "successful",
        data:{
            user: UpdateUser
        }
    })
})