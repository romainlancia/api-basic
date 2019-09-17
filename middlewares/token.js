const jwt = require('jsonwebtoken')
const fs = require('fs')
const msg = require('../consts/strings')
const V = require('voca')

const PUBLIC_KEY = fs.readFileSync(__dirname + '/../public.pem') //.key

module.exports.checkToken = (req, res, next) => {
    if (
        V.isEmpty(req.headers.authorization) === false &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            PUBLIC_KEY,
            (err, payload) => {
                if (err) {
                    return res.status(403).json({
                        success: msg.SUCCESS_FALSE,
                        message: msg.ERR_PERMISSION_DENIED,
                    })
                }
                console.log('JWT is valid and payload is\n', payload)
                next()
            }
        )
    } else {
        return res.status(404).json({
            success: msg.SUCCESS_FALSE,
            message: msg.ERR_TOKEN_NOT_FOUND,
        })
    }
}
