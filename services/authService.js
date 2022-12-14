const { User } = require('@models/models')
const bcrypt = require('bcrypt')
const { validateRefreshToken, generateTokens } = require('@helpers/auth')
const { userRoles } = require('@constants')

class AuthService {
  async findUser(email) {
    const user = await User.findOne({ where: { email } })
    return user
  }

  async createUser(email, password, role) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const userRole = role || 'USER'
    const user = await User.create({ email, password: hash, role: userRole })
    return user
  }

  async createUserFromGoogle(email) {
    const userRole = userRoles.USER

    try {
      const user = await User.create({
        email,
        role: userRole,
      })

      const userFromDB = await this.findUser(email)

      const { accessToken, refreshToken } = await generateTokens(
        userFromDB.id,
        userFromDB.role
      )

      const responseUser = {
        accessToken,
        refreshToken,
        user: {
          id: userFromDB.id,
          email: userFromDB.email,
          role: userFromDB.role,
        },
      }
      await this.saveToken(user.id, refreshToken)

      return responseUser
    } catch (err) {
      console.log(err)
    }
  }

  async getAllUsers() {
    const users = await User.findAll()
    return users
  }

  async matchPassword(password, hashPassword) {
    const match = await bcrypt.compare(password, hashPassword)
    return match
  }

  async saveToken(userId, refreshToken) {
    await User.update(
      { refresh_token: refreshToken },
      { where: { id: userId } }
    )
  }

  async refreshTokenInDB(refreshToken) {
    if (!refreshToken) {
      throw Error('User is not authorized!')
    }

    const userData = validateRefreshToken(refreshToken)

    const tokenFromDB = await User.findOne({
      where: { refresh_token: refreshToken },
    })

    if (!userData || !tokenFromDB) {
      throw Error('User is not authorized')
    }

    const user = await User.findOne({ where: { id: userData.id } })
    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
      user.id,
      user.role
    )
    await this.saveToken(user.id, newRefreshToken)
    return { accessToken }
  }

  async deleteRefreshToken(refreshToken) {
    await User.update(
      { refresh_token: null },
      { where: { refresh_token: refreshToken } }
    )
  }
}

module.exports = new AuthService()
