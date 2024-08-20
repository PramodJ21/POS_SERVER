var userDb = require('../model/Users.json')
const roleDb = require('../model/roles.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')

function getRoleName(roleId) {
    // Loop through the roles object to find the matching role name
    for (const [roleId, role] of Object.entries(roleDb)) {
        if (role === roleId) {
            return role;
        }
    }
    // Return null or throw an error if the role name is not found
    return null; 
}
const authConroller = async (req,res) => {
    const {username, password} = req.body
    if(!username || !password) return res.status(400).json({msg:"Username and password cannot be blank"})

    const foundUser = userDb.find(user=> user.username === username)

    if (!foundUser) return res.sendStatus(401) //unauthorized
    try{
        const isMatch = await bcrypt.compareSync(password, foundUser.password)
        if(isMatch){
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "UserInfo":{
                        "username":foundUser.username,
                        "roles":roles
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"30s"}
            )
            const refreshToken = jwt.sign(
                {"username":foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:"1d"}
            )

            const otherUsers = userDb.filter(user => user.username !== foundUser.username)
            const currentUser = {...foundUser, refreshToken}
            userDb = [...otherUsers, currentUser]

            await fsPromises.writeFile(
                path.join(__dirname, '..','model','Users.json'),
                JSON.stringify(userDb)
            )
            res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000, sameSite:'None', secure : true})
            res.json({accessToken})
        }else{
            res.sendStatus(401) //unauthorized
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg: err.msg})
    }
}

module.exports = authConroller