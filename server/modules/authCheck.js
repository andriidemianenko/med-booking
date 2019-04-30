const jwt = require('jsonwebtoken')
const secret = 'secretJWT'

module.exports = async (req, res, next) => {
  const token = req.headers.Authorization
  const decoded = jwt.decode(token)
  if (!token && req.method === 'OPTIONS') {
    res.status(401).json({
      status: 'You are not Authorized!'
    })
  } else {
    try {
      await jwt.verify(token, secret)
      res.status(200).json({
        message: 'Auth token is valid'
      })
    } catch (error) {
      res.status(401).json({
        message: 'Invalid token'
      })
    }
  }
  next()
}
