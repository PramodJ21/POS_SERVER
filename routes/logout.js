const express = require('express')
const router = express.Router()

router.get('/', require('../controller/logoutController'))
module.exports = router