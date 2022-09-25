require('module-alias/register')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
const meetupsRoutes = require('./routes/meetups.js')
const authRoutes = require('./routes/auth.js')

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger/openapi.json'))

dotenv.config()

const app = express()

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/meetups', meetupsRoutes)
app.use('/auth', authRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Welcome to meetups api'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
