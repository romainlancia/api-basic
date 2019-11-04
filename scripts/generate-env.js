// @flow
const fs = require('fs')
const pathEnv = '/../.env'
const API_NAME = 'API_NAME=api\n'
const PORT_MAX = 65635
const PORT_MIN = 49152
const PORT =
    'PORT=' +
    Math.floor(Math.random() * (PORT_MAX - PORT_MIN) + PORT_MIN) +
    '\n'

try {
    console.log('console: checking for env file...')
    if (fs.existsSync(__dirname + pathEnv) === false) {
        fs.openSync(__dirname + pathEnv, 'w')
        fs.writeFileSync(__dirname + pathEnv, PORT + API_NAME, 'utf8')
        console.log('console: env file is now generated!')
    } else {
        console.log('console: env file found, all good!')
    }
} catch (e) {
    console.log(e)
    process.exit(1)
}
