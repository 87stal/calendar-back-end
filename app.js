const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const financeEntriesRouter = require('./routes/api/financeEntries')
const usersRouter = require('./routes/api/users')
const { HttpCode } = require('./helpers/constants')
require('dotenv').config()

const app = express()


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Too many requests, please try again later.'
    })
  }
})

app.use('/api/', apiLimiter)
app.use('/api/users', usersRouter)
app.use('/api/financeEntries', financeEntriesRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
