require('module-alias/register')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const fs = require('fs')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')

const meetupsRoutes = require('./routes/meetups')
const authRoutes = require('./routes/auth')

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger/openapi.json'))

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/meetups', meetupsRoutes)
app.use('/auth', authRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Welcome to meetups api'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
