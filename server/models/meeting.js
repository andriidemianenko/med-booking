const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/med-booking')

const meeting = mongoose.Schema({
  doctor_name: String,
  patient_name: String,
  cabinetNo: Number,
  date: String,
  time: String,
  doctor_id: String,
  patient_id: String
})

module.exports = mongoose.model('meeting', meeting)
