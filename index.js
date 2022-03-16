// imports
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

// inits
const app = express()
dotenv.config()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/tweets', require('./routes/tweets'))
app.use('/api/comments', require('./routes/comments'))
app.use('/api/likes', require('./routes/likes'))

// listen
app.listen(1000, ()=>console.log("server up and runing on port 1000"))