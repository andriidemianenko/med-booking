const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/med-booking')

const meeting = mongoose.Schema({
  doctor_name: {
    type: String,
    required: true
  },
  patient_name: {
    type: String,
    required: true
  },
  cabinetNo: Number,
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: Number,
  doctor_id: {
    type: String,
    required: true
  },
  patient_id: {
    type: String,
    required: true
  },
  isActive: Boolean,
  description: String
})

module.exports = mongoose.model('meeting', meeting)
