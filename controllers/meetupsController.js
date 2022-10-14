const meetupsService = require('@services/meetupsService')
const { status, infoMessages, errorMessage } = require('@constants')

class MeetupsController {
  async getMeetups(req, res) {
    try {
      const meetups = await meetupsService.getAll()
      if (!meetups) {
        return res.status(status.success).send('No meetups in database')
      }
      return res.json(meetups)
    } catch (error) {
      res.status(status.error).send(error)
    }
  }

  async createMeetup(req, res) {
    try {
      const meetup = await meetupsService.create(req.body)
      console.log('meetup: ', meetup)
      res.status(status.created).json(meetup)
    } catch (err) {
      console.log(err)
      res.status(status.error).json({ message: err })
    }
  }

  async getMeetupById(req, res) {
    const { id } = req.params
    try {
      const singleMeetup = await meetupsService.getById(id)
      console.log('singlMeetup: ', singleMeetup)
      if (!singleMeetup) {
        res
          .status(status.not_found)
          .send(`${infoMessages.NO_MEETUP_IN_DB} ${id}`)
      }
      res.status(status.success).json(singleMeetup)
    } catch (err) {
      res.status(status.error).send({ message: 'error' })
    }
  }

  async deleteMeetup(req, res) {
    const { id } = req.params
    try {
      const item = await meetupsService.delete(id)
      if (!item) {
        res
          .status(status.not_found)
          .send(`${infoMessages.NO_MEETUP_IN_DB} ${id}`)
      } else {
        res.status(status.success).send(`${id} ${infoMessages.DELETED_MEETUP}`)
      }
    } catch (error) {
      res.status(status.error).send(errorMessage)
    }
  }

  async updateMeetup(req, res) {
    const { id } = req.params
    try {
      await meetupsService.update(req.body, id)
      res.status(status.success).json({ message: 'updated!' })
    } catch (error) {
      res.status(status.error).send({ massage: 'error' })
    }
  }
}

module.exports = new MeetupsController()
