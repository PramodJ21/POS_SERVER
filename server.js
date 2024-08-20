require('dotenv').config()
const express = require('express')
const app = express()
const verfyJWT = require('./middleware/verifyJWT')
const cookieParser = require("cookie-parser")
const credentials = require('./middleware/credentials')
const corsOptions = require('./config/corsOptions')
const cors = require('cors')
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())

app.use(cookieParser())

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

// app.use(verfyJWT)

app.use('/getUser', require('./routes/getUser'))
app.use('/verifyUser', require('./routes/verifyUser'))
app.use('/deleteUser', require('./routes/deleteUser'))
app.use('/storeSales', require('./routes/storeSales'))
app.use('/getSales', require('./routes/getSales'))
app.get('/test', (req,res)=>{res.json("Helloo HOw are you")})

app.listen(3500, ()=>{console.log(`Server running at port 3500`)})