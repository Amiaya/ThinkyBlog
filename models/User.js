const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    FullName: {
        type: String,
        require:[true, 'Please tell us your name']
    },
    email:{
        type: String,
        unique: true,
        require: [true, 'Please provide an email']
    },
    password:{
        type: String,
        require: [true, 'Please provide a password']
    },
    role: {
        type: String
    },
    bio: {
        type: String
    },
    image: {
        type: String,
        default: 'default.jpg'
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.correctPassword = async function(canidatePassword, userPassword){
    return await bcrypt.compare(canidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)
module.exports = User