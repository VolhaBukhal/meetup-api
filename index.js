import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import fs from 'fs'
import swaggerUi  from 'swagger-ui-express'
const swaggerDocument = JSON.parse(fs.readFileSync('./openapi.json'))
import meetupsRoutes from './routes/meetups.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express();

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/meetups', meetupsRoutes)
app.use('/auth', authRoutes)
app.use( '/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) =>  res.send("Welcome to meetups api"))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
})

