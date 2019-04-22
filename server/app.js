const express = require('express')
const bodyParser = require('body-parser')
const allowCrossDomain = require('./modules/allowCrossDomain')

const app = express()

app.use(bodyParser.json())
app.use(allowCrossDomain)

app.get('/', (req, res) => {
  res.json({ message: 'hello!' })
})

app.listen(process.env.PORT || 8081)
