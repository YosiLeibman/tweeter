const { db } = require('../db/db')
const { onlyLogged } = require('../helpers/onlyLogged')

const router = require('express').Router()

router.post('/', onlyLogged, (req, res) => {

    const { tweet_id, author } = req.body

    const user = db.find(ur => ur.username == author)

    const tweet = user.tweets.find(t => t.id == tweet_id)

    if (tweet.likes?.includes(req.user.username)) {
        tweet.likes = tweet.likes.filter(un => un != req.user.username)
        res.send({ msg: 'think about it again :(' })
    } else {
        tweet.likes?.push(req.user.username)
        res.send({ msg: 'thanks! ervery like is counted!' })
    }

})

module.exports = router