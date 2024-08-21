const express = require('express')
const router = express.Router()
const mastersDb = require('../model/Masters.json')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises
router.get('/get', (req,res)=>{
    res.json(mastersDb)
})
router.post('/add', (req,res)=>{
    
    const {no,name,category, uom,purchasePrice,sellPrice} = req.body
    mastersDb.push({no,name,category, uom,purchasePrice,sellPrice})
    
    fsPromises.writeFile(
        path.join(__dirname,'..','model','Masters.json'),
        JSON.stringify(mastersDb)
    )

    res.sendStatus(200)
})

router.post('/delete' , (req,res) => {
    const {no} = req.body
    const newMastersDb = mastersDb.filter((item)=>item.no !== no)
    fsPromises.writeFile(
        path.join(__dirname,'..','model','Masters.json'),
        JSON.stringify(newMastersDb)
    )
    res.sendStatus(200)
})
module.exports = router