const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  res.status(200).json({
    data: {
      message: 'You, have successfully logged in!'
    }
  })
})
router.post('/register', (req, res) => {
  console.log(req.body)
  res.status(200).json({
    data: {
      message: 'You, have successfully registered in!'
    }
  })
})

module.exports = router