const { db } = require('../db/db')
const { onlyLogged } = require('../helpers/onlyLogged')

const router = require('express').Router()

router.get('/', onlyLogged, (req, res) => {
    const { username } = req.user
    const user = db.find(ur => ur.username == username)
    res.status(user ? 200 : 404).send(user || { err: 'profile not found' })
})

router.put('/avatar', (req, res) => {

})

router.put('/nickname', (req, res) => {

})

router.post('/follow', (req, res) => {

})

module.exports = router