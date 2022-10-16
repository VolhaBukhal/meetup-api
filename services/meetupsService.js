const { Meetup } = require('@models/models')

class MeetupsService {
  async getAll() {
    const meetups = await Meetup.findAll()
    return meetups
  }

  async create(meetup) {
    try {
      const item = await Meetup.create({ ...meetup })
      return item
    } catch (err) {
      return err
    }
  }

  async getById(meetupId) {
    const item = await Meetup.findByPk(meetupId)
    console.log('item: ', item)
    return item
  }

  async delete(meetupId) {
    const item = await Meetup.destroy({
      where: {
        id: meetupId,
      },
    })

    return item
  }

  async update(params, meetupId) {
    try {
      const item = Meetup.update({ ...params }, { where: { id: meetupId } })
      return item
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new MeetupsService()
