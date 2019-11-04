// @flow
import jwt from 'jsonwebtoken'
import fs from 'fs'
import V from 'voca'
import type { Request, Response, NextFunction } from 'express'
import { responseFromApi } from '../functions/response'
import { ERR_PERMISSION_DENIED, ERR_TOKEN_NOT_FOUND } from '../consts/strings'

const PUBLIC_KEY = fs.readFileSync(__dirname + '/../../public.pem')

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    if (
        V.isEmpty(req.headers.authorization) === false &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            PUBLIC_KEY,
            (err, payload) => {
                if (err) return responseFromApi(res, 403, ERR_PERMISSION_DENIED)
                console.log('JWT is valid and payload is\n', payload)
                next()
            }
        )
    } else {
        return responseFromApi(res, 404, ERR_TOKEN_NOT_FOUND)
    }
}
