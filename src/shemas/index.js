// @flow
import * as Joi from 'joi'

export const validateUser = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
})
