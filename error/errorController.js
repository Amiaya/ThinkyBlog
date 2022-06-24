
const AppError = require('../utils/appError')

const sendDev = (err,res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

module.exports = (err, req,res, next) => {
    err.statusCode =  err.statusCode || 500
    err.status = err.status || 'error'
    sendDev(err, res)
    console.log(err.stack)
}