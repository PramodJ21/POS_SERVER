const express = require('express')
const router = express.Router()
const userDb = require('../model/Users.json')
router.post('/', (req,res) => {

    const username = req.body.username;
    const userIndex = userDb.find(user => user.username === username);
    if (userIndex !== -1) {
        userDb.splice(userIndex, 1);
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }

} )
module.exports = router