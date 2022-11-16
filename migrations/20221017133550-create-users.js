/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: { type: Sequelize.DataTypes.STRING, unique: true },
      password: { type: Sequelize.DataTypes.STRING, unique: true },
      refresh_token: { type: Sequelize.DataTypes.STRING, unique: true },
      role: { type: Sequelize.DataTypes.STRING, defaultValue: 'USER' },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user')
  },
}
