const express = require('express')
const router = express.Router()

router.post('/', require('../controller/storeSalesController'))
module.exports = router