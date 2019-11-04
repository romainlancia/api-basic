// @flow
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    type: String,
    site_admin: Boolean,
})

export default mongoose.model('users', userSchema)
