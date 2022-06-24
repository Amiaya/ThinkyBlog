const Joi = require('joi')

const userValidator = Joi.object({
    FullName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().max(30),
    bio: Joi.string().max(120)
})
module.exports = userValidator