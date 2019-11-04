// @flow
import { SUCCESS_TRUE, SUCCESS_FALSE } from '../consts/strings'
import type { Response } from 'express'

export function responseFromApi(res: Response, code: number, msg: string) {
    return res.status(code).json({
        success: code != 200 ? SUCCESS_FALSE : SUCCESS_TRUE,
        message: msg,
    })
}
