const fs = require('fs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const msg = require('../consts/strings')
const validateUser = require('../shemas').validateUser
const User = require('../models/user').User

const PRIVATE_KEY = fs.readFileSync(__dirname + '/../private.pem') //private.key

router.post(
    '/',
    (req, res, next) => {
        User.find({ email: req.body.email }, (err, docs) => {
            if (err) {
                res.status(500).send({
                    success: msg.SUCCESS_FALSE,
                    message: msg.ERR_DATABASE,
                })
            }

            if (docs.length === 0) {
                res.status(401).json({
                    success: msg.SUCCESS_FALSE,
                    message: msg.ERR_WRONG_CREDENTIALS,
                })
            } else {
                bcrypt.compare(
                    req.body.password,
                    docs[0].password,
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                success: msg.SUCCESS_FALSE,
                                message: msg.ERR_COMPARING_HASH,
                            })
                        }

                        if (result === true) {
                            next()
                        } else {
                            return res.status(401).json({
                                success: msg.SUCCESS_FALSE,
                                message: msg.ERR_WRONG_CREDENTIALS,
                            })
                        }
                    }
                )
            }
        })
    },
    (req, res) => {
        const { error, value } = Joi.validate(req.body, validateUser)

        if (error) {
            res.status(400).json({
                success: msg.SUCCESS_FALSE,
                message: error.details[0].message,
            })
        } else {
            jwt.sign(
                value.email,
                PRIVATE_KEY,
                { algorithm: 'RS256' },
                (err, token) => {
                    if (err) {
                        res.status(500).send({
                            success: msg.SUCCESS_FALSE,
                            message: msg.ERR_GEN_TOKEN,
                        })
                    }
                    return res.status(200).json({ token })
                }
            )
        }
    }
)

module.exports = router
