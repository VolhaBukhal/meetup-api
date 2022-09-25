const express = require('express')
const { meetupSchema, updateMeetupSchema } = require('@validation/schemas')
const { authMiddleware } = require('@middleware/authMiddleware')
const {
  meetupValidationMiddleware,
} = require('@middleware/validationMiddleware')
const {
  getMeetups,
  createMeetup,
  getMeetupById,
  deleteMeetup,
  updateMeetup,
} = require('@controllers/meetups')

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

module.exports = router
