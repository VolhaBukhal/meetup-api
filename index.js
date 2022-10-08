require('module-alias/register')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const swaggerUi = require('swagger-ui-express')
const passport = require('passport')

const meetupsRoutes = require('./routes/meetups')
const authRoutes = require('./routes/auth')

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger/openapi.json'))

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === 'production' ? 'true' : 'auto',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.session())

app.use('/meetups', meetupsRoutes)
app.use('/auth', authRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
}

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/', (req, res) => res.send('Welcome to meetups api'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
