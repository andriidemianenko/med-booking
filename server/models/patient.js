const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/med-booking')

const patient = mongoose.Schema({
  email: String,
  name: String,
  second_name: String,
  phone_number: Number,
  card_number: Number,
  password: String
})

module.exports = mongoose.model('patient', patient)
