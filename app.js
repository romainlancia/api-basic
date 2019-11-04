// @flow
import path from 'path'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import express from 'express'
import routes from './src/routes'
import cors from 'cors'

const app = express()

// RETRIEVE ENV DATA
const portMongo = 27017
const port = process.env.PORT || 3000
const apiName = process.env.API_NAME || 'api'
const mongoUri = process.env.MONGO_URI || `mongodb://localhost:${portMongo}`

// INIT DATABASE
mongoose
    .connect(`${mongoUri}/${apiName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`console: connected to the database ${apiName}`))
    .catch(err => console.error(err))

// INIT API
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname + 'public')))
app.use(cors())
app.options('*', cors())

// ROUTING
routes.forEach(route => {
    app.use(route.path, route.router)
})

app.listen(port, () => console.log(`console: API listening on port ${port}!`))
