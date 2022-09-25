const express = require('express')

const { registration, login, getUsers } = require('@controllers/auth')
const { userValidationMiddleware } = require('@middleware/validationMiddleware')
const { userSchema } = require('@validation/schemas')
const { roleMiddleware } = require('@middleware/roleMiddleware')

const router = express.Router()

router.post('/registration', userValidationMiddleware(userSchema), registration)
router.post('/login', login)
router.get('/users', roleMiddleware('ADMIN'), getUsers)

module.exports = router
