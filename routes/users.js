const express = require('express')
const router = express.Router()
const Joi = require('joi')
const R = require('ramda')
const bcrypt = require('bcrypt')

const msg = require('../consts/strings')
const validateUser = require('../shemas').validateUser
const Users = require('../models/user').User
const M = require('../middlewares/token')

const saltRounds = 10
const pickedData = ['_id', 'email', 'type', 'site_admin']

router.post(
    '/',
    (req, res, next) => {
        Users.find({ email: req.body.email }, (err, docs) => {
            if (err) {
                res.status(500).send({
                    success: msg.SUCCESS_FALSE,
                    message: msg.ERR_DATABASE,
                })
            }
            if (docs.length > 0) {
                return res.status(400).json({
                    success: msg.SUCCESS_FALSE,
                    message: msg.ERR_USER_ALREADY_EXIST,
                })
            }
            next()
        })
    },
    (req, res) => {
        const { error, value } = Joi.validate(req.body, validateUser)

        if (error) {
            return res.status(400).json({
                success: msg.SUCCESS_FALSE,
                message: error.details[0].message,
            })
        } else {
            const { email, password } = value

            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        success: msg.SUCCESS_FALSE,
                        message: msg.ERR_GEN_HASH_PASSWORD,
                    })
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
                        if (err) {
                            return res.status(500).send({
                                success: msg.SUCCESS_FALSE,
                                message: msg.ERR_DATABASE,
                            })
                        }
                        return res.status(200).send({
                            success: msg.SUCCESS_TRUE,
                            message: msg.OK_ACCOUNT_CREATED,
                        })
                    })
                }
            })
        }
    }
)

router.get('/', M.checkToken, (req, res) => {
    Users.find({}, (err, docs) => {
        if (err) {
            return res
                .status(500)
                .send({ success: msg.SUCCESS_FALSE, message: msg.ERR_DATABASE })
        }
        return res.status(200).json(R.map(R.pick(pickedData), docs))
    })
})

router.delete('/:id', M.checkToken, (req, res) => {
    Users.deleteOne({ _id: req.params.id }, err => {
        if (err) {
            return res.status(404).send({
                success: msg.SUCCESS_FALSE,
                message: msg.ERR_USER_NOT_FOUND,
            })
        }
        return res
            .status(200)
            .json({ success: msg.SUCCESS_TRUE, message: msg.OK_USER_DELETED })
    })
})

router.put('/:id', M.checkToken, (req, res) => {
    Users.update({ _id: req.params.id }, req.body, err => {
        if (err) {
            return res.status(404).json({
                success: msg.SUCCESS_FALSE,
                message: msg.ERR_USER_NOT_FOUND,
            })
        }
        return res
            .status(200)
            .json({ success: msg.SUCCESS_TRUE, message: msg.OK_USER_UPDATED })
    })
})

module.exports = router
