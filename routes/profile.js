const { db } = require('../db/db')
const { onlyLogged } = require('../helpers/onlyLogged')

const router = require('express').Router()

router.get('/', (req, res) => {
    const { username } = req.query
    const user = db.find(ur => ur.username == username)
    res.status(user ? 200 : 404).send(user || { err: 'profile not found' })
})

router.put('/avatar', onlyLogged, (req, res) => {
    const user = db.find(ur => ur.username == req.user.username)
    user.avatar = req.body.avatar
    res.send({msg:'avatar updataed, great pic btw!'})
})

router.put('/nickname', onlyLogged, (req, res) => {
    const user = db.find(ur => ur.username == req.user.username)
    user.nickname = req.body.nickname
    res.send({msg:'nick updataed, cool name bruh!'})
})

router.post('/follow', onlyLogged, (req, res) => {
    
    // check for taken usernames
    if (!db.some(user => user.username == req.body.username)) {
        return res.status(400).send({ err: "you can't have imaginary friends here =(" })
    }

    const user = db.find(ur => ur.username == req.user.username)
    
    if (user.following.includes(req.body.username)) {
        user.following = user.following.filter(un=>un != req.body.username)
        res.send({msg:"unfollowing " + req.body.username})
    }else{
        user.following.push(req.body.username)
        res.send({msg:"now you're following " + req.body.username})
    }

})

module.exports = router