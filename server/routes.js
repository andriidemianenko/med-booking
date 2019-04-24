const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Patient = require('./models/patient')
const Doctor = require('./models/doctor')

const salt = 'secretPhrase'

const sha512 = password => {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const value = hash.digest('hex')
  return value
}

router.post('/login', async (req, res) => {
  console.log(req.body)
  const incPassword = sha512(req.body.password)
  await res.status(200).json({
    data: {
      message: 'You, have successfully logged in!'
    }
  })
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
  await account.save()
  res.status(200).json({
    data: {
      message: 'You, have successfully registered!'
    }
  })
})

module.exports = router
