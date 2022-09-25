import { status } from '../constants/status.js'
import {
  userExists,
  createUser,
  getAllUsers,
  matchPassword,
  generateTokens,
  saveToken,
} from '../helpers/auth.js'

export const registration = async (req, res) => {
  try {
    const { email, password, role } = req.body
    const userIsExist = await userExists(email)

    if (userIsExist) {
      res.status(status.bad_request).json('User is already exist')
    } else {
      await createUser(email, password, role)
      res.send(`User: ${email} was registered successfully`)
    }
  } catch (err) {
    res.status(status.bad_request).json({ message: 'Registration error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userIsExist = await userExists(email)
    if (!userIsExist) {
      res
        .status(status.not_found)
        .json({ message: `User with ${email} hasn't been found` })
    } else {
      const validPassword = await matchPassword(password, userIsExist.password)
      if (!validPassword) {
        res
          .status(status.not_found)
          .json({ message: `Invalid password, please, try again` })
      } else {
        const { accessToken, refreshToken } = await generateTokens(
          userIsExist.user_id,
          userIsExist.role
        )
        res.send({
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: {
            id: userIsExist.user_id,
            email: userIsExist.email,
            role: userIsExist.role,
          },
        })
        await saveToken(userIsExist.user_id, refreshToken)
      }
    }
  } catch (err) {
    console.log(err)
    res.status(status.bad_request).json({ message: 'Login error' })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.send(users)
  } catch {
    res.status(status.error).json({ message: 'error' })
  }
}
