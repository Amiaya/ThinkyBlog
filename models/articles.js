const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'An article must have a title']
    },
    description: {
        type: String,
        required: [true, 'An article must have a description']
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, 'Must be logged in']
    },
    category_name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    }
},{timestamps:true})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article