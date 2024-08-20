var userDb = require('../model/Users.json')
const roleDb = require('../model/roles.json')
const fsPromises = require('fs').promises
const path = require('path')

const handleLogout = async (req,res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204) // No content
    const refreshToken = cookies.jwt
     
    // Is refreshToken in db?
    const foundUser = userDb.find(user=> user.refreshToken === refreshToken)

    if (!foundUser){
        res.clearCookie('jwt', {httpOnly: true, maxAge: 24*60*60*1000, sameSite:'None', secure : true})
        return res.sendStatus(204)
    } 
    
    //Delete the refreshToken in db
    const otherUsers = userDb.filter(user => user.username !== foundUser.username)
    const currentUser = {...foundUser, refreshToken:""}

    userDb = [...otherUsers, currentUser]

    await fsPromises.writeFile(
        path.join(__dirname, '..','model','Users.json'),
        JSON.stringify(userDb)
    )

    res.clearCookie('jwt', {httpOnly: true, maxAge: 24*60*60*1000, sameSite:'None', secure : true}) // secure true - only serves on https (add in production)
    res.sendStatus(204)

}

module.exports = handleLogout