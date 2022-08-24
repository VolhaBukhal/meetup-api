import express from 'express'
import bodyParser from 'body-parser'

import meetupsRoutes from './routes/meetups.js'

const app = express();

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/meetups', meetupsRoutes)

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!!!'))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
})

