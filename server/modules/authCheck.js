const jwt = require('jsonwebtoken')
const secret = 'secretJWT'

module.exports = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token && req.method === 'OPTIONS') {
    res.status(401).json({
      status: 'You are not Authorized!'
    })
  } else {
    try {
      await jwt.verify(token, secret)
      res.status(200)
    } catch (error) {
      res.status(401)
    }
  }
  next()
}
