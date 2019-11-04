// @flow
import express from 'express'
import bcrypt from 'bcrypt'
import * as Joi from 'joi'
import * as R from 'ramda'
import Users from '../models/user'
import { checkToken } from '../middlewares/token'
import { validateUser } from '../shemas'
import { responseFromApi } from '../functions/response'
import {
    ERR_DATABASE,
    ERR_GEN_HASH_PASSWORD,
    ERR_USER_ALREADY_EXIST,
    ERR_USER_NOT_FOUND,
    OK_ACCOUNT_CREATED,
    OK_USER_DELETED,
    OK_USER_UPDATED,
} from '../consts/strings'

const router = express.Router()
const saltRounds = 10
const pickedData = ['_id', 'email', 'type', 'site_admin']

router.post(
    '/',
    (req, res, next) => {
        Users.find({ email: req.body.email }, (err, docs) => {
            if (err) return responseFromApi(res, 500, ERR_DATABASE)
            if (docs.length > 0)
                return responseFromApi(res, 400, ERR_USER_ALREADY_EXIST)
            next()
        })
    },
    (req, res) => {
        const { error, value } = Joi.validate(req.body, validateUser)

        if (error) {
            return responseFromApi(res, 400, error.details[0].message)
        } else {
            const { email, password } = value

            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    return responseFromApi(res, 500, ERR_GEN_HASH_PASSWORD)
                } else {
                    const newUser = new Users(
                        R.merge(
                            {
                                email: email,
                                password: hash,
                            },
                            { type: 'User', site_admin: false }
                        )
                    ).save((err, user) => {
                        if (err) return responseFromApi(res, 500, ERR_DATABASE)
                        return responseFromApi(res, 200, OK_ACCOUNT_CREATED)
                    })
                }
            })
        }
    }
)

router.get('/', checkToken, (req, res) => {
    Users.find({}, (err, docs) => {
        if (err) return responseFromApi(res, 500, ERR_DATABASE)
        return res.status(200).json(R.map(R.pick(pickedData), docs))
    })
})

router.delete('/:id', checkToken, (req, res) => {
    Users.deleteOne({ _id: req.params.id }, err => {
        if (err) return responseFromApi(res, 404, ERR_USER_NOT_FOUND)
        return responseFromApi(res, 200, OK_USER_DELETED)
    })
})

router.put('/:id', checkToken, (req, res) => {
    Users.update({ _id: req.params.id }, req.body, err => {
        if (err) return responseFromApi(res, 404, ERR_USER_NOT_FOUND)
        return responseFromApi(res, 200, OK_USER_UPDATED)
    })
})

export default router
