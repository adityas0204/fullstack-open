require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware')

const app = express()

mongoose 
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info(`Connected to Mongoose`)
  })
  .catch((error) => {
    logger.error(`Error: ${error}`)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(tokenExtractor)
app.use(userExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', userExtractor, blogsRouter)

app.use(errorHandler)

module.exports = app