const express = require('express')
// const { meetupSchema, updateMeetupSchema } = require('@validation/schemas')
// const {
//   meetupValidationMiddleware,
// } = require('@middleware/validationMiddleware')
// const {
//   getMeetups,
//   createMeetup,
//   getMeetupById,
//   deleteMeetup,
//   updateMeetup,
// } = require('@controllers/meetups')
const passport = require('passport')
// const { authMiddleware } = require('@middleware/authMiddleware')
const meetupsController = require('@controllers/meetupsController')

require('@config/passport')
const { jwtStrategy } = require('@config/passport')

passport.use(jwtStrategy)

const router = express.Router()

router.get('/', meetupsController.getMeetups)

// router.post(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   meetupValidationMiddleware(meetupSchema),
//   createMeetup
// )
router.post('/', meetupsController.createMeetup)

router.get('/:id', meetupsController.getMeetupById)

router.delete('/:id', meetupsController.deleteMeetup)
// router.delete(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   deleteMeetup
// )

router.put('/:id', meetupsController.updateMeetup)
// router.put(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   meetupValidationMiddleware(updateMeetupSchema),
//   updateMeetup
// )

module.exports = router
