const express = require('express')
const router = express.Router()

router.get('/', require('../controller/getUserController'))
module.exports = router