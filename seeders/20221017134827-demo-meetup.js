/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('meetup', [
      {
        title: 'Figma',
        description: 'Firma meeting',
        tags: ['web'],
        time: new Date(),
        place: 'Central Hall',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('meetup', null, {})
  },
}
