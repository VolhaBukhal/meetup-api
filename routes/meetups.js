import express from 'express'
import { getMeetups, createMeetup, getMeetupById, deleteMeetup, updateMeetup} from '../controllers/meetups.js'
import { validationMiddleware } from '../validation/middleware.js'
import { meetupSchema, updateMeetupSchema } from '../validation/schemas.js';

const router = express.Router();

router.get('/', getMeetups)

router.post('/', validationMiddleware(meetupSchema), createMeetup)

router.get('/:id', getMeetupById)

router.delete('/:id', deleteMeetup)

router.patch('/:id', validationMiddleware(updateMeetupSchema), updateMeetup)


export default router;
