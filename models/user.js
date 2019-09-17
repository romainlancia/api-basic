const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    type: String,
    site_admin: Boolean,
})

module.exports.User = mongoose.model('users', userSchema)
