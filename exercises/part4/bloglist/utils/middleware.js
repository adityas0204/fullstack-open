const logger = require('./logger')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    request['token'] = token
  } else {
    request['token'] = null
  }
  next()
}

const userExtractor = (request, response, next) => {
  if (!request.token) {
    request.user = null
    return next()
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = decodedToken
    next()
  } catch {
    return response.status(401).json({ error: 'token validation' })
  }
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'username to be unique' })
  } else if (error.name === 'ValidationError' && error.message.includes('User validation failed')) {
    return response.status(400).json({ error: 'username and name must be included'})
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalidation' })
  }
  next(error)
}

module.exports = { errorHandler, tokenExtractor, userExtractor}