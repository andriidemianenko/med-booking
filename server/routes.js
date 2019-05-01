const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Patient = require('./models/patient')
const Doctor = require('./models/doctor')
const authCheck = require('./modules/authCheck')

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
  let user = (await Doctor.findOne({ email: req.body.email })) || (await Patient.findOne({ email: req.body.email }))
  const account = user.qualification ? 'doctor' : 'patient'
  if (user) {
    if (user.password === incPassword) {
      const JWToken = jwt.sign({
        email: user.email,
        _id: user._id
      },
      secret,
      {
        expiresIn: '30m'
      })
      await res.status(200).append('auth_token', JWToken).json({
        message: 'welcome back',
        account,
        _id: user._id,
        auth_token: JWToken
      })
    } else {
      await res.status(401).json({
        message: 'Invalid password!'
      })
    }
  } else {
    await res.status(401).json({
      message: 'This email does not exist!'
    })
  }
})
router.post('/register', async (req, res) => {
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
router.get('/:user/:userId/userData', authCheck, async (req, res) => {
  const accountType = req.params.user
  const userId = req.params.userId
  try {
    const user = accountType === 'doctor' ? (await Doctor.findOne({ _id: userId })) : (await Patient.findOne({ _id: userId }))
    res.json({
      profileData: {
        email: user.email,
        name: user.name,
        secondName: user.second_name,
        phoneNumber: user.phone_number,
        cardNumber: user.card_number,
        qualification: user.qualification
      }
    })
  } catch (err) {
    res.status(500).json({
      message: 'Ooops! Something went wrong...'
    })
  }
})
module.exports = router
