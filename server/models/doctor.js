const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/med-booking')

const doctor = mongoose.Schema({
  email: String,
  name: String,
  second_name: String,
  phone_number: Number,
  qualification: String,
  password: String
})

module.exports = mongoose.model('doctor', doctor)
