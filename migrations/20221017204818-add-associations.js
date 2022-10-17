/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'meetupId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'meetup',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
    await queryInterface.addColumn('meetup', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user', 'meetupId')
    await queryInterface.removeColumn('meetup', 'userId')
  },
}
