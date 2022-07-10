const express = require('express')
const AppError = require('./utils/appError')
const errorController = require('./error/errorController')

const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const articleRouter = require('./routes/article')

const app = express()

app.use(express.json())

app.use('/ThinkyBlog', categoryRouter)
app.use('/ThinkyBlog', userRouter)
app.use('/ThinkyBlog', articleRouter)

app.post('/user',(req,res) => {
    res.sendStatus(200)
})

app.all('*', (req,res,next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 400))
})
app.use(errorController)
module.exports = app