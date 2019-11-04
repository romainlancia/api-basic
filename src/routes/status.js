// @flow
import express from 'express'
import { responseFromApi } from '../functions/response'
import { ALIVE } from '../consts/strings'

const router = express.Router()

router.get('/', (req, res) => {
    responseFromApi(res, 200, ALIVE)
})

export default router
