const express = require('express')
const router = express.Router()
const salesTransactions = require('../model/salesTransactions.json')
router.get('/', (req,res) => {
    try {
        res.json(salesTransactions);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router