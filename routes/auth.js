const express = require('express')
const router = express.Router()

router.post('/', require('../controller/authController'))
module.exports = router