const express = require('express')
const router = express.Router()
const purchaseDb = require('../model/Purchase.json')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises
router.get('/get', (req,res)=>{
    res.json(purchaseDb)
})
router.post('/store', (req,res)=>{
    
    const data = req.body
    purchaseDb.push(data)
    
    fsPromises.writeFile(
        path.join(__dirname,'..','model','Purchase.json'),
        JSON.stringify(purchaseDb)
    )

    res.sendStatus(200)
})

module.exports = router