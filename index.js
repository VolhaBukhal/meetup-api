import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import meetupsRoutes from './routes/meetups.js'
import swaggerUi  from 'swagger-ui-express'
const swaggerDocument = JSON.parse(fs.readFileSync('./openapi.json'))

const app = express();

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/meetups', meetupsRoutes)
app.use( '/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) =>  res.json(swaggerDocument))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
})

