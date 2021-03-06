const jwt = require("jsonwebtoken")

module.exports.everyone = function (req, res, next) {
    console.log(req.cookies)
    try {
        const dec = jwt.decode(req.cookies.sid)
        if (dec) {
            req.user = dec
        } else {
            req.user = false
        }
        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}


// jwt.sign ==> generates new token
// jwt.verify ==> checks the Authentication
// jwt.decode ==> skips the checking, just retuns the payload