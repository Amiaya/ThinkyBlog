const mongoose = require('mongoose')

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    articleId: {
        type: mongoose.Schema.ObjectId,
        ref: "Article",
        required: true
    }
})

const Bookmark = mongoose.model("Bookmark", bookmarkSchema)
module.exports = Bookmark