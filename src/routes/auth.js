// @flow
import fs from 'fs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import * as Joi from 'joi'
import { responseFromApi } from '../functions/response'
import {
    ERR_COMPARING_HASH,
    ERR_DATABASE,
    ERR_GEN_TOKEN,
    ERR_WRONG_CREDENTIALS,
} from '../consts/strings'
import User from '../models/user'
import { validateUser } from '../shemas'

const router = express.Router()
const PRIVATE_KEY = fs.readFileSync(__dirname + '/../../private.pem')

router.post(
    '/',
    (req, res, next) => {
        User.find({ email: req.body.email }, (err, docs) => {
            if (err) return responseFromApi(res, 500, ERR_DATABASE)

            if (docs.length === 0) {
                return responseFromApi(res, 401, ERR_WRONG_CREDENTIALS)
            } else {
                bcrypt.compare(
                    req.body.password,
                    docs[0].password,
                    (err, result) => {
                        if (err)
                            return responseFromApi(res, 500, ERR_COMPARING_HASH)

                        if (result === true) {
                            next()
                        } else {
                            return responseFromApi(
                                res,
                                401,
                                ERR_WRONG_CREDENTIALS
                            )
                        }
                    }
                )
            }
        })
    },
    (req, res) => {
        const { error, value } = Joi.validate(req.body, validateUser)

        if (error) {
            return responseFromApi(res, 400, error.details[0].message)
        } else {
            jwt.sign(
                value.email,
                PRIVATE_KEY,
                { algorithm: 'RS256' },
                (err, token) => {
                    if (err) return responseFromApi(res, 500, ERR_GEN_TOKEN)

                    return res.status(200).json({ token })
                }
            )
        }
    }
)

export default router
