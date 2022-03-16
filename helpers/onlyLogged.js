const jwt = require('jsonwebtoken')
const { refreshes } = require('../db/refreshes')

module.exports.onlyLogged = function (req, res, next) {

    jwt.verify(req.cookies.sid,process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            if (err.name == "TokenExpiredError") {
                const dec = jwt.decode(req.cookies.sid)
                jwt.verify(refreshes[dec.username], process.env.REFRESH_TOKEN, (err, decoded) => {
                    // invalid both
                    if (err) {
                        return res.status(403).send({ err: 'you logged out, please log in again' })
                    }
                    // valid refresh token but invalid access (only exp time err)
                    const accessToken = jwt.sign({ username: dec.username, nick: dec.nickname }, "SomeSecret", { expiresIn: '7m' })
                    res.cookie("sid", accessToken, {
                        httpOnly: true,
                        secure: false
                    })
                    req.user = dec
                    next()
                })
            } else {
                return res.status(401).send({ err: 'protected content, please log in again.' })
            }
        } else {
            jwt.verify(refreshes[decoded.username], process.env.REFRESH_TOKEN, (err, decoded) => {
                // valid access token but invalid refresh, e.g. fast logout
                if (err) {
                    return res.status(403).send({ err: 'you logged out, please log in again' })
                }
                // both token valid
                req.user = decoded
                next()
            })
        }
    })

}

// INvalid Atoken(EXP) + valid Rtoken
// both invald

//ELSE valid Atoken + valid Rtoken V
//ELSE valid Atoken + invalid Rtoken V