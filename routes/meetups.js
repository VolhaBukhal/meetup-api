import express from 'express'
import { getMeetups, createMeetup, getMeetupById, deleteMeetup, updateMeetup} from '../controllers/meetups.js'

const router = express.Router();

router.get('/', getMeetups)

router.post('/', createMeetup)

router.get('/:id', getMeetupById)

router.delete('/:id', deleteMeetup)

router.patch('/:id', updateMeetup)


export default router;
