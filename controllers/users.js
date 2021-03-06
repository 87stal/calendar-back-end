const jwt = require('jsonwebtoken')
const Users = require('../model/users')
require('dotenv').config()
const { HttpCode } = require('../helpers/constants')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const { nanoid } = require('nanoid')


const reg = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email in use'
      })
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    const newUser = await Users.create({
      ...req.body
    })
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      ResponseBody: {
        user: {
          email: newUser.email,
          token: token
        }
      }
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    if (!user || !user.validPassword(password)) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'UNAUTHORIZED',
        message: 'Email or password is wrong'
      })
    }
    const id = user._id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(id, token)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      ResponseBody: {
        token: token,
        user: {
          email: user.email,
          subscription: user.subscription
        }
      }
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  const id = req.user.id
  await Users.updateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

const currentUser = (req, res, next) => {
  const { email, subscription } = req.user
  res.json({
    status: 'success',
    code: HttpCode.OK,
    ResponseBody: {
      email: email,
      subscription: subscription
    }
  })
}


module.exports = { reg, login, logout, currentUser }
