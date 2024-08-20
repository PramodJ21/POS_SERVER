var userDb = require('../model/Users.json')
const role_list = require('../config/roles_list')
const bcrypt = require('bcrypt')
const fsPromises = require('fs').promises
const path = require('path')


const registerController = async (req,res) => {
    const{username, email,role,password} = req.body

    if(!username || !password || !email ||!role) return res.status(400).json({msg:"Username and password and email cannot be blank"})
    
    const duplicate = userDb.find(user => user.username === username)
    if(duplicate) return res.sendStatus(409) //conflict

    try{
        const hashedPwd = await bcrypt.hash(password, 10)
        const newUser = {"username": username,
            "email" : email,
            "roles" : {[role]: role_list[role]}, 
            "password" : hashedPwd}
        userDb.push(newUser)
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','Users.json'),
            JSON.stringify(userDb)
        )
        res.status(201).json({msg: "User created successfully"})
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

module.exports = registerController