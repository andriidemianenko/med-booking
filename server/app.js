const express = require('express')
const bodyParser = require('body-parser')
const allowCrossDomain = require('./modules/allowCrossDomain')

const app = express()

app.use(bodyParser.json())
app.use(allowCrossDomain)

app.post('/login', (req, res, next) => {
  console.log(req.body)
  res.json({
    data: 'You, have successfully logged in!'
  })
  res.sendStatus(200)
  next()
})

app.listen(process.env.PORT || 8081)
