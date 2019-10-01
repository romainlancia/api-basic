const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const portMongo = 27017
const port = process.env.PORT || 3000
const apiName = process.env.API_NAME || 'api'
const mongoUri = process.env.MONGO_URI || `mongodb://localhost:${portMongo}`

const root = require('./routes')
const user = require('./routes/users')
const auth = require('./routes/auth')

// INIT DATABASE
mongoose
    .connect(`${mongoUri}/${apiName}`, { useNewUrlParser: true })
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
