const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Patient = require('./models/patient')
const Doctor = require('./models/doctor')

const salt = 'secretSalt'
const secret = 'secretJWT'

const sha512 = password => {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const value = hash.digest('hex')
  return value
}

router.post('/login', async (req, res) => {
  const incPassword = sha512(req.body.password)
  let user = await Doctor.findOne({ email: req.body.email }) || Patient.findOne({ email: req.body.email })
  if (user) {
    if (user.password === incPassword) {
      const JWToken = jwt.sign({
        email: user.email,
        _id: user._id
      },
      secret,
      {
        expiresIn: '4m'
      })
      await res.status(200).append('auth_token', JWToken).json({
        message: 'welcome back',
        auth_token: JWToken
      })
    } else {
      await res.status(401).json({
        message: 'Invalid password!'
      })
    }
  } else {
    await res.status(401).json({
      message: 'This email does not exits!'
    })
  }
})
router.post('/register', async (req, res) => {
  console.log(req.body)
  let account = null
  const password = sha512(req.body.password)
  if (req.body.doctor) {
    account = new Doctor({
      email: req.body.email,
      name: req.body.name,
      second_name: req.body.secondName,
      phone_number: req.body.phoneNumber,
      qualification: req.body.qualification,
      password: password
    })
  } else {
    account = new Patient({
      email: req.body.email,
      name: req.body.name,
      second_name: req.body.secondName,
      phone_number: req.body.phoneNumber,
      card_number: req.body.cardNumber,
      password: password
    })
  }
  try {
    await account.save()
    res.status(200).json({
      message: 'You, have successfully registered!',
      register_success: true
    })
  } catch (err) {
    await res.status(400).json({
      message: 'Failed registration',
      register_success: false
    })
  }
})

module.exports = router
