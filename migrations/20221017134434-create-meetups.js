/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meetup', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: Sequelize.DataTypes.STRING },
      description: { type: Sequelize.DataTypes.STRING },
      tags: { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
      time: { type: Sequelize.DataTypes.STRING },
      place: { type: Sequelize.DataTypes.STRING },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('meetup')
  },
}
