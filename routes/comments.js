const { v4 } = require('uuid')
const { db } = require('../db/db')
const { onlyLogged } = require('../helpers/onlyLogged')

const router = require('express').Router()


router.get('/:author/:tweet_id', (req, res) => {
    const { author, tweet_id } = req.params

    if (!author || !tweet_id) {
        return res.status(400).send({ err: 'missing some info' })
    }

    const user = db.find(ur => ur.username == author)

    const tweet = user.tweets.find(t => t.id == tweet_id)

    res.send(tweet.comments)

})

router.post('/', onlyLogged, (req, res) => {

    const { author, text, tweet_id } = req.body

    if (!author || !tweet_id || !text) {
        return res.status(400).send({ err: 'missing some info' })
    }

    const user = db.find(ur => ur.username == author)

    const tweet = user.tweets.find(t => t.id == tweet_id)
  
    tweet.comments.push({
        published:new Date(),
        text,
        username:req.user.username
    })
    res.send({msg:'your comment submitted, we will publish it soon'})
})

module.exports = router