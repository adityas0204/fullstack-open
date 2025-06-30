const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')

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

app.use('/api/blogs', blogsRouter)

module.exports = app