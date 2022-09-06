import express from 'express'

const router = express.Router()

import { registration, login, getUsers } from '../controllers/auth.js'
import { userValidationMiddleware } from '../middleware/validationMiddleware.js'
import { userSchema } from '../validation/schemas.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'


router.post('/registration', userValidationMiddleware(userSchema),  registration)
router.post('/login', login) 
router.get('/users', roleMiddleware('ADMIN'), getUsers)

export default router


