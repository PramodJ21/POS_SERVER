var userDb = require('../model/Users.json')
const roleDb = require('../model/roles.json')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const handleRefreshToken = (req,res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    
    const refreshToken = cookies.jwt
    const foundUser = userDb.find(user=> user.refreshToken === refreshToken)
    if (!foundUser) return res.sendStatus(403) //forbidden
    try{
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.username !== decoded.username) return res.sendStatus(403)
                const roles = Object.values(foundUser.roles)
                const accessToken = jwt.sign(
                    {
                        "UserInfo" : {
                            "username": foundUser.username,
                            "roles" : roles
                    }},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '30s'}
                )
                res.json({accessToken})
            }
        )
        
    }
    catch(err){
        res.status(500).json({msg: err.msg})
    }
}

module.exports = handleRefreshToken