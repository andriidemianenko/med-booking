const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/med-booking')

const message = mongoose.Schema({
  sender: String,
  to: String,
  meeting_id: String,
  text: String,
  sender_id: String,
  to_id: String
})

module.exports = mongoose.model('message', message)