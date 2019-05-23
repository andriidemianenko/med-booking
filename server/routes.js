const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Patient = require('./models/patient')
const Doctor = require('./models/doctor')
const Meeting = require('./models/meeting')
const Message = require('./models/message')

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
        expiresIn: '5h'
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
      message: 'You have successfully registered!',
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
      message: `Ooops! Something went wrong...\n${err}`
    })
  }
})

router.get('/doctors', authCheck, async (req, res) => {
  try {
    const doctors = await Doctor.find()
    res.json({ doctors })
  } catch (err) {
    res.status(500).json({
      message: `Ooops! Something went wrong...\n${err}`
    }).end()
  }
})

router.post('/meetings', authCheck, async (req, res) => {
  try {
    const meeting = new Meeting({
      ...req.body,
      duration: 40,
      isActive: false
    })
    let meetingResponse = await meeting.save()
    res.json({
      message: 'Your meeting was successfully created!',
      meeting: meetingResponse
    }).end()
  } catch (err) {
    res.status(500).json({
      message: `Ooops! Something went wrong...\n${err}`
    }).end()
  }
})
router.put('/meetings/:meetingId', authCheck, async (req, res) => {
  const isActive = req.body.isActive
  try {
    let meeting = await Meeting.findByIdAndUpdate({ _id: req.params.meetingId }, { isActive })
    res.json({
      message: 'Successful meeting assignment!',
      meeting
    })
  } catch (err) {
    res.status(500).json({
      message: `Ooops! Something went wrong...\n${err}`
    })
  }
})
router.get('/:user/:userId/meetings', authCheck, async (req, res) => {
  try {
    let meetings = null
    if (req.params.user === 'doctor') {
      meetings = await Meeting.find({ doctor_id: req.params.userId })
      res.json({ meetings }).end()
    } else {
      meetings = await Meeting.find({ patient_id: req.params.userId })
      res.json({ meetings }).end()
    }
  } catch (err) {
    res.json({
      message: `Ooops! Something went wrong...\n${err}`,
      meetings: []
    }).end()
  }
})

router.delete('/delete/meeting/:meetingId', authCheck, async (req, res) => {
  try {
    await Meeting.deleteOne({ _id: req.params.meetingId })
    res.status(200).end()
  } catch (err) {
    res.status(500).json({
      message: `Ooops! Something went wrong...\n${err}`
    }).end()
  }
})

router.post('/:user/:userId/update-profile', authCheck, async (req, res) => {
  let updatedProfile = null
  try {
    if (req.params.user === 'patient') {
      updatedProfile = await Patient.updateOne({
        name: req.body.name,
        second_name: req.body.secondName,
        card_number: req.body.cardNumber,
        phone_number: req.body.phoneNumber
      })
    } else if (req.params === 'doctor') {
      updatedProfile = await Patient.updateOne({
        name: req.body.name,
        second_name: req.body.secondName,
        phone_number: req.body.phoneNumber,
        description: req.body.description
      })
    }
    res.json({ updatedProfile }).end()
  } catch (err) {
    res.status(500).json({
      message: `Ooops! Something went wrong...\n${err}`
    }).end()
  }
})

router.post('/message/from/:senderId/to/:receiverId', authCheck, async (req, res) => {
  try {
    const sender = (await Patient.findOne({ _id: req.params.senderId })) || (await Doctor.findOne({ _id: req.params.senderId }))
    const message = new Message({
      ...req.body,
      sender_name: `${sender.name} ${sender.second_name}`,
      receiver_id: req.params.receiverId,
      sender_id: req.params.senderId
    })
    await message.save()
    res.json({
      message: 'Message succesfully send!',
      message_sent: true
    }).end()
  } catch (err) {
    res.status(500).json({
      message: `Ooops! Something went wrong...\n${err}`
    }).end()
  }
})

router.get(`/:receiverId/inbox/`, authCheck, async (req, res) => {
  try {
    const messages = await Message.find({ receiver_id: req.params.receiverId })
    res.json({ messages }).end()
  } catch (err) {
    res.status(500).json({
      message: `Ooops! Something went wrong...\n${err}`
    }).end()
  }
})

module.exports = router
