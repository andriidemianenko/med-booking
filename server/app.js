const express = require('express')
const bodyParser = require('body-parser')
const allowCrossDomain = require('./modules/allowCrossDomain')
const routes = require('./routes')

const app = express()

const PORT = 8081

app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
