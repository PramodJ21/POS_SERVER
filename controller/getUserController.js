const getUserController = (req,res) =>{
    const userDb = require("../model/Users.json")
    // const cookies = req.cookies
    // if(!cookies?.jwt) return res.sendStatus(401)
    
    // const refreshToken = cookies.jwt
    // const foundUser = userDb.find(user=> user.refreshToken === refreshToken)
    // console.log(foundUser)
    // if (!foundUser) return res.sendStatus(403) //forbidden
    
    res.json(userDb)
}

module.exports = getUserController