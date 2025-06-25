# [Saving data to MongoDB](https://fullstackopen.com/en/part3/saving_data_to_mongo_db)

### Debugging Node applications

- Can always `console.log()` 
  - Will look at other methods too

#### VSC

- Can start debugger from `Run` in toolbar at top
- Can also go to `Run and Debug` panel on left side
  - Then select `Node.js` from dropdown and choose the `start` config
  - This will attach a debugger to the `npm start` script
  - More recommended because this will launch the app more appropriately

![alt text](images/debug-dropdown.png)

- Breakpoints can be added to pause execution

#### Dev tools 

- Debugging can also be done in dev console

#### Question everything

- Bugs can exist anywhere in your code
  - Be systematic and eliminate all possibilities one by one
    - Use the console logging, Postman, and debuggers 

### MongoDB

- Will use MongoDB to save notes indefinitely
- Will use MongoDB Atlas
  - This is a MongoDB service provider that gives cloud storage 
  - Create a free account and create a new, free cluster after selecting the cloud provider and data center

![alt text](images/new-cluster.png)

- You will be greeted with a popup to create user credentials for the db
  - These will be used by your app to connect to the db
  - This can also be done in the _Quickstart_ menu

![alt text](images/new-user.png)

- In _Network Access_, add a new IP address, and allow connection from anywhere for simplicity
- Now, connect to the db
  - Need db connection string, found by selecting _Connect_ then _Drivers_ in the _Clusters_ section
  - This will show the _MongoDB URI_, which is the address of the db that we will give to MongoDB client library in our app:

![alt text](images/mongodb-uri.png)

- Can now use the db
  - Could do directly from JS code with Official MongoDB Node.js driver library 
  - Will instead use Mongoose library that offers higher level API
- Mongoose is an _object document mapper_ (ODM)
  - Lets us easily turn JS objects into MongoDB documents
- Install Mongoose into the backend:

```bash
npm install mongoose
```

- Create practice app by making file _mongo.js_ in root of notes backend app
- Use the URI generated from MongoDB Atlas
- Code should also be passed password as command line arg:

```js
const password = process.argv[2]
```

- Run code with command _node mongo.js yourPassword_, which will cause Mongo to add a new document to the database
  - The password to be inputted is the database user's password
- The inputted document can be viewed under _Browse Collections_ in _Clusters_

![alt text](images/collection.png)

- Drop default db _test_, and change name of db in connection string to _noteApp_ by modifying URI:

```js
const url = `mongodb+srv://fullstack:${password}@cluster0.bvak88w.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
```

- After running command once more:

![alt text](images/new-db.png)

- MongoDB Atlas automatically creates a db when an app tries to connect to a nonexistent db

 ### Schema

 - Make schema for new note and matching model:

```js
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```

- `noteSchema` var defines the schema for a note
  - Tells mongoose how note objects are to be stored in the db
- In the `Note` model definition, _'Note'_ is the singular name of the model
  - Name of collection will automatically be named lowercase plural _notes_ 
  - Mongoose convention to name collections as plural, whereas schema should refer to them in singular
- MongoDB is schemaless

### Creating and saving objects

- Create new note object with _Note_ model:

```js
const note = new Note({
  content: 'HTML is Easy',
  important: false,
})
```

-  Models are constructor functions
   -  Create new JS objects based on given params
   -  Objects have all properties of model
      -  Includes method to save object to db 
-  `save` method saves object to db
   -  Returns a promise that can be resolved by the event handler in the `then` method

```js
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```

- The connection remains open till the program terminates, or `mongoose.connection.close()` is called
- Result of operation stored in `result` param

### Fetching objects from the database

- This code will return all the notes in the db:

```js
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
```

- The output is as follows:

```js
{
  _id: new ObjectId('6854bae6e3b8d2a55fee9e6f'),
  content: 'HTML is easy',
  important: true,
  __v: 0
}
```

- `find` takes searching conditions as params
  - Similar to what is typically done in MongoDB:

```js
Note.find({ important: true }).then(result => {
  // ...
})
```

### Connecting the backend to a database

- Will use mongo in notes app
  - Copy paste definitions into _index.js_ first:

```js
const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```

- Change event handler for fetching all notes:

```js
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
```

- Visiting http://localhost:3001/api/notes displays the notes from the db as expected
- We do not want to show the versioning field *__v* and the *_id*
  - Can modify objects returned by Mongoose using `toJSON` method of schema:

```js
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
```

- This is basically saying that any notes created from this schema (all the notes returned from the db) should follow this behaviour when `toJSON` is called on them
  - The method `json()` actually calls `toJSON` 
  - The second parameter is an object, which will have the key `transform` specifically
  - A function will take the returned object and turn the id into a string since `_id` is an object
  - Then the `_id` and `__v` keys will get deleted
  - It manipulates `returnedObject` in place
- No changes need to be made to the handler for fetching all notes

### Moving db configuration to its own module

- Extract Mongoose code into own file
  - Create directory for the module called _models_ and add a file called _note.js_:

```js
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
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

- Few changes
  - Hardcoding URL is not a good idea, so it is passed as MONGODB_URI env var
    - Can define value of env var on start up: `MONGODB_URI="your_connection_string_here" npm run dev`
  - Making a connection logs messages on success or failure
- Defining node modules differs from ES6 modules
  - Public interface of module is defined by setting value to `module.exports` 
    - We set the value to be _Note_ model
    - Other things inside of the module will not be accessible to users of the module
  - Import module into _index.js_:

```js
const Note = require('./models/note')
```

- The _Note_ var is assigned to the same object that the module defines

### Defining environment variables using the dotenv library

- Install the `dotenv` library 
- Create a _.env_ file at the root of your project
- Define env vars:

```
MONGODB_URI=mongodb+srv://fullstack:thepasswordishere@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
```

- Git ignore this file
- Use these env vars by doing `require('dotenv').config()`
  - Reference env like normal env vars: `process.env.MONGODB_URI`
- Load env vars at the top to use them throughout:

```js
require('dotenv').config()
const express = require('express')
const Note = require('./models/note')
const app = express()
// ..

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

- Important to import _dotenv_ before _note_ module to allow env vars to be used globally
- Since we have gitignore _.env_ file, when using Render we must still provide the env var
  - It is done through their dashboard:

![alt text](images/render-env.png)

### Using database in route handlers

- Change rest of functionality to link with db
- New note code:

```js
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
```

- Note created using _Note_ model
- It is saved to the db
  - _savedNote_ is the returned note that is formatted automatically by our `.set` rule when `toJSON` is called (which is called by `.json()`)
- Use Mongoose's `findById` method for fetching individual note:

```js
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})
```

- Error checking will be introduced later

### Verifying frontend and backend integration

- Since we made changes to the backend, test using Postman or VS Code REST client by making a new note:

![alt text](images/backend-test.png)

- Inefficient to test the frontend before the backend 
  - That is why tools like Postman and VS Code REST client are good

### Error handling

- If a non-existent note is visited, then the response from the db is null
  - Instead, the server should respond with HTTP status code 404 not found
  - Also include a `catch` to handle promises returned by `findById` that are rejected:

```js
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})
```

- If matching note not in db, then `null` value will be returned by db, then HTTP status code 404 sent in response
- If promise of `findById` rejected, then response will have status code 500 _internal server error_
- Need to handle case of incorrect id that is not Mongo style
  - If malformed id provided, callback function in `catch` will be called
  - Change the `catch`:

```js
.catch(error => {
    console.log(error);
    response.status(400).send({ error: 'malformatted id' });
})
```

- Status code 400 Bad Request is most appropriate since:

> The 400 (Bad Request) status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).

- Always log the error to the console to have additional info regarding the problem
- It is also important to look at the server output in the terminal

### Moving error handling into middleware

- Error handling is written among rest of code, which is fine
  - Can also implement all of it in one place instead
    - Can be useful for error-tracking through [Sentry](https://sentry.io/welcome/)
- Change event handler for fetching a specific note
  - It will pass error forward with `next` function, and `next` becomes third param:

```js
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
```

- Error is given to `next` function as param
  - If `next` called without argument, execution would move onto next route or middleware
  - With params, execution continues to _error handler middleware_
- Express error handlers are middleware that are defined with a function that takes four params
  - Ours:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
```

- If there is a _CastError_ exception, then we know it's due to invalid object id for Mongo
  - If not this error, then handler passes execution to default Express error handler
- Note that this errorHandler should be the last loaded middleware and all other routes should be registered before this
  - If you want to check for more errors, then include more `if` statements

### The order of middleware loading

- Important to load middleware in order of use in Express
- Correct order:

```js
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.post('/api/notes', (request, response) => {
  const body = request.body
  // ...
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // ...
}

// handler of requests with result to errors
app.use(errorHandler)
```

- Use _jsonParser_ at top since it is used in the other routes
- `unknownEndpoint` catches endpoints that don't exist 
  - It displays an error after all the existing routes have been checked
- Good practice to call a middleware function right after defining it

### Other operations

- Add some functionality
  - Such as deleting and updating a note
- Easiest way to delete note is with `findByIdAndDelete` method:

```js
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
```

- In both 'successful' cases of deleting a resource, backend responds with status code 204 _no content_ 
  - Deleting a note that exists and one that does not are the cases
  - `result` param could be used to check if resource was actually deleted
    - Could use info for two cases 
- Implement updating a single note:

```js
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})
```

- Note to be updated is fetched from db using `findById` method
  - If it doesn't exist, then status code 404 _Not found_ is sent in the response
- If note found, then `content` and `important` fields are updated with data in `request` object
  - Then, note saved to db using `save` 
  - HTTP request responds by sending updated note in response
- There is a nested promise chain
  - This works since the return literally returns a promise, forcing the outer `then` to