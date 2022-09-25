import express from 'express'
import {
  getMeetups,
  createMeetup,
  getMeetupById,
  deleteMeetup,
  updateMeetup,
} from '../controllers/meetups.js'
import { meetupValidationMiddleware } from '../middleware/validationMiddleware.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { meetupSchema, updateMeetupSchema } from '../validation/schemas.js'

const router = express.Router()

router.get('/', getMeetups)

router.post(
  '/',
  authMiddleware,
  meetupValidationMiddleware(meetupSchema),
  createMeetup
)

router.get('/:id', getMeetupById)

router.delete('/:id', authMiddleware, deleteMeetup)

router.patch(
  '/:id',
  authMiddleware,
  meetupValidationMiddleware(updateMeetupSchema),
  updateMeetup
)

export default router
