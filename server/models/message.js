const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/med-booking')

const message = mongoose.Schema({
  sender_name: String,
  receiver_id: String,
  meeting_id: String,
  message: String,
  type: String,
  sender_id: String
})

module.exports = mongoose.model('message', message)
