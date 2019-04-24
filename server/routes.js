const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) => {
  await res.status(200).json({
    data: {
      message: 'You, have successfully logged in!'
    }
  })
})
router.post('/register', async (req, res) => {
  console.log(req.body)
  await res.status(200).json({
    data: {
      message: 'You, have successfully registered!'
    }
  })
})

module.exports = router
