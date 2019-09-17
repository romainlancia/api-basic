const express = require('express')
const router = express.Router()
const msg = require('../consts/strings')

router.get('/', (req, res) => {
    res.status(200).json({ success: msg.SUCCESS_TRUE, message: msg.NOOP })
})

module.exports = router
