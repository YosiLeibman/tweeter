const router = require('express').Router()
const { db } = require('../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { refreshes } = require('../db/refreshes')



router.post('/register', async (req, res) => {
    // destructuring the body
    const { username, password, nickname, avatar } = req.body

    // check for missing params
    if (!username || !password || !nickname || !avatar) {
        return res.status(400).send({ err: 'missing some info' })
    }

    // check for taken usernames
    if (db.some(user => user.username == username)) {
        return res.status(400).send({ err: 'username already taken' })
    }

    // hash the password
    const hash = await bcrypt.hash(password, 10)

    // save the user to the db
    db.push({
        username,
        password: hash,
        nickname,
        avatar,
        tweets: [],
        following: []
    })

    // close the request
    res.send({ msg: 'user added, welcome' })

})

router.post('/login', async (req, res) => {
    // destructuring the body
    const { username, password } = req.body

    // check for missing params
    if (!username || !password) {
        return res.status(400).send({ err: 'missing some info' })
    }

    // select the user
    const user = db.find(ur => ur.username == username)

    // check for 'user not found' case
    if (!user) {
        return res.status(400).send({ err: 'user not found' })
    }

    // compare the hashed passwords
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return res.status(401).send({ err: 'wroge password' })
    }

    // create tokens
    const accessToken = jwt.sign({ username, nick: user.nickname }, "SomeSecret", { expiresIn: '7m' })
    const refreshToken = jwt.sign({ username, nick: user.nickname }, "SomeOtherSecret", { expiresIn: '100d' })

    // save the refresh token in the valut
    refreshes[username] = refreshToken

    // save the access token in the client cookie
    res.cookie("sid", accessToken, {
        httpOnly:true,
        secure:false
    })

    res.send({msg:'welcome '+username})
})

router.delete('/logout', (req, res) => {

})

module.exports = router


