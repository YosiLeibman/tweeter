// imports
const express = require('express')
const cookieParser = require('cookie-parser')

// inits
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/tweets', require('./routes/tweets'))
app.use('/api/comments', require('./routes/comments'))
app.use('/api/likes', require('./routes/likes'))

// listen
app.listen(1000, ()=>console.log("server up and runing on port 1000"))