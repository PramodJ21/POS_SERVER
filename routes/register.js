const express = require('express')
const router = express.Router()

router.post('/', require('../controller/registerController'))
module.exports = router