/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt')

const hidePassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('user', [
      {
        email: 'example@exampl.com',
        password: await hidePassword('11111111'),
        refresh_token: null,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user', null, {})
  },
}
