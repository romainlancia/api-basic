const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const apiName = process.env.API_NAME || 'api'

const root = require('./routes')
const user = require('./routes/users')
const auth = require('./routes/auth')

// INIT DATABASE
mongoose
    .connect(`mongodb://localhost:27017/${apiName}`, { useNewUrlParser: true })
    .then(() => console.log(`console: connected to the database ${apiName}`))
    .catch(err => console.error(err))

// INIT API
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname + 'public')))

// ROUTING
app.use('/', root)
app.use('/users', user)
app.use('/authenticate', auth)

app.listen(port, () => console.log(`console: API listening on port ${port}!`))
