const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/med-booking')

const message = mongoose.Schema({
  sender: String,
  meeting_id: String,
  text: String,
  message_type: String
})

module.exports = mongoose.model('message', message)