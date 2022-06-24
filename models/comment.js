const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    articleId: {
        type: mongoose.Schema.ObjectId,
        ref: "Article",
        required: true
    },
    comment: {
        type: String,
        required: true
    }
},{timestamps:true})

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment