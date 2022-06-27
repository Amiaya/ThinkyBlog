const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const userValidator = require('../schema/userValidator')
const AppError = require('../utils/appError')
const User = require('../models/User')
const {promisify} = require('util')


const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createToken= (user, statusCode,res) => {
    const token = signToken(user._id)
    user.password =  undefined
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}


exports.signUp = catchAsync(async(req,res,next) => {
    const value = await userValidator.validateAsync(req.body)
    const newUser = await User.create({
        FullName: value.FullName,
        email: value.email,
        password:value.password
    })
    createToken(newUser, 201, res)
})

exports.login = catchAsync(async(req,res,next) => {
    const {email, password} =  req.body
    // 1) Check if the email or password exist
    if(!email || !password){
        return next(new AppError('Please provide an email and password', 400))
    }
    // 2) check if the user with this email exist
    const user = await User.findOne({email}).select('+password')
    if(!user || !await user.correctPassword(password, user.password)){
        return next(new AppError('incorrect password or username', 401))
    }

    // 3) if everthing is okay then send the token to the client
    createToken(user,200, res)
})

exports.protect = catchAsync(async(req,res,next) => {
  // 1) Getting token and checking if it's there  
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }
  if(!token){
    return next(new AppError('You are not login, Please Login to get access',401))
  }

  // 2) verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return next(new AppError('The user belonging to this token no longer exist', 401))
    }

    req.user = currentUser

    next()
})