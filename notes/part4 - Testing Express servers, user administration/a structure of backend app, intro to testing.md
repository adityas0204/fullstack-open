# [Structure of backend application, introduction to testing](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing)

Will continue working on backend notesapp from part 3

### Project structure

- Modify structure of prject to adhere to Node.js best practices:

```
├── controllers
│   └── notes.js
├── dist
│   └── ...
├── models
│   └── note.js
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
├── app.js
├── index.js
├── package-lock.json
├── package.json
```

- Put all printing to console in its own module _utils/logger.js_:

```js
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }
```

- Module can be used for `error` or `info` 
- Extracting it is a good idea for writing logs to a file or an external service
  - We would only have to change the logging in one place 
- Handling of env vars extracted to _utils/config.js_ file:

```js
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT }
```

- Other parts of app access env vars by importing config module:

```js
const config = require('./utils/config')

logger.info(`Server running on port ${config.PORT}`)
```

- Route handlers moved into dedicated directory
  - They are called _controllers_, so that is what we will call the directory
- It will all be in a file called _notes.js_
- It is very similar to _index.js_ file with some key differences
  - At the top we create a [router](https://expressjs.com/en/api.html#router) object: 

```js
const notesRouter = require('express').Router()

//...

module.exports = notesRouter
```

 - The router is exported to be available to any consumer that wants to use it
 - Routes are defined for router object
   - Similar to before
 - Now a route's path looks like:

```js
notesRouter.delete('/:id', (request, response, next) => { })
```

- The router is a middleware
  - Used to defining 'related routes' in a single place, which is typically placed in its own module
  - Any connection to our _api/notes_ is a similar route
  - The router is used if the URL of the request starts with _/api/notes_, as will be shown 
    - Hence, we only need to define the relative parts of the route (ie empty path / or param _/:id_)
- _app.js_ takes the router into use:

```js
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)
```

- _app.js_ defines the app and should be created in the root directory of the project:

```js
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
```

- File uses different middleware
  - One is _notesRouter_ that is attatched to _/api/notes_ route 
- Custom middleware is moved to new _utils/middleware.js_ module:

```js
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
```

- _app.js_ will be in charge of connecting to db 
- _models/note.js_ will only define Mongoose schema for notes:

```js
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
```

- That model is then imported into _notes.js_, which is incharge of all the routing
- _index.js_ is used for starting the file and gets simplified:

```js
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
```

- _index.js_ file imports actual app (it is an express app) from _app.js_ and starts the app
  - `info` function of logger module used to print to console if app is working
- Now, Express app and code taking care of web server are separate and follow [best practices](https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7)
- "One of the advantages of this method is that the application can now be tested at the level of HTTP API calls without actually making calls via HTTP over the network, this makes the execution of tests faster."
- For smaller apps the structure does not matter much
  - For larger ones it is good to organize the modules
  - There is no scrict structure, these are just good practices

### Note on exports

- Two types of exports in this app
  - One is in _logger.js_:

```js
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }
```

- An object with two fields is exported 
  - When importing, you can use this in two ways:
    1. Refer to the functions using the dot param 

```js
const logger = require('./utils/logger')

logger.info('message')
logger.error('error message')
```
   2. Destructure the function into their own vars:

```js
const { info, error } = require('./utils/logger')

info('message')
error('error message')
```

- The second way of exporting is favorable when you only use a small portion of the exported functions