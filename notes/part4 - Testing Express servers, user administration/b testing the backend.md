# [Testing the backend](https://fullstackopen.com/en/part4/testing_the_backend)

- Will test backend
  - Won't use unit testing since not complicated
    - Could unit test `toJSON` method
- Could implement tests by using mock db instead of real one
  - [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) can be used 
- Will use REST API to test due to simplicity of app
- Integration testing is testing multiple components of a system as a group
  - Use this

### Test environment

- When server running in Render, it is in production mode
- Convention to define execution mode of app with *NODE_ENV* env var
  - Env var only defined in _.env_ file, not production mode
- Common practice to define separate modes for development and testing
  - Change scripts in _package.json_:

```json
"scripts": {
  "start": "NODE_ENV=production node index.js",
  "dev": "NODE_ENV=development node --watch index.js",
  "test": "NODE_ENV=test node --test",
  "lint": "eslint ."
}
```

- Specified mode of execution for scripts
  - `npm run dev` has _development_ mode
  - `npm start` has _production_ mode
- This won't work on Windows, so install [cross-env](https://www.npmjs.com/package/cross-env) package:

```bash
npm install cross-env
```

- Use cross-env in npm scripts:

```json
"scripts": {
  "start": "cross-env NODE_ENV=production node index.js",
  "dev": "cross-env NODE_ENV=development node --watch index.js",
  "test": "cross-env NODE_ENV=test node --test",
  "lint": "eslint ."
}
```

- Can now modify how app runs in different modes
  - Can define app to use different testing db when running tests
- Testing backend with DB has many avenues
  1. We will create new MongoDB Atlas db 
     - Not optimal since if multiple developers are running tests, then they may override each other's data and break one another's tests
  2. Use local MongoDB
     - Local MongoDB instance on computer to avoid conflicts
     - Should use isolated test db for every test to avoid any form of conflict
       - Can use MongoDB In-memory Server or Docker
- Will be using MongoDB Atlas db
  - Make changes to `utils/config.js`:

```js
require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
```

- _.env_ file should have separate env var for db address of test and development db:

```
MONGODB_URI=mongodb+srv://fullstack:thepasswordishere@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0
PORT=3001

TEST_MONGODB_URI=mongodb+srv://fullstack:thepasswordishere@cluster0.a5qfl.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0
```

- Our `config` module slightly resembles [node-config](https://github.com/lorenwest/node-config) package
  - We will stick to ours since simple app
- Done changing app

### supertest

- Use [supertest](https://github.com/visionmedia/supertest) package for testing API
  - Install as development dependency:

```bash
npm install --save-dev supertest
```

- First test in *tests/note_api.test.js*:

```js
const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})
```

- Test imports Express app from _app.js_ and wraps in _supertest_ function into [superagent](https://github.com/visionmedia/superagent) object
  - Object assigned to `api` var
  - Tests can use it for making HTTP requests to backend
- Test makes HTTP GET request to _/api/notes_
  - Expects a status code 200 in return and _Content-type_ header of _application/json_ (data in desired format)
- Checking value of header uses weird syntax:

```js
.expect('Content-Type', /application\/json/)
```

- Desired value defined as regular expression (regex)
  - Regex starts with / and ends with /
  - _application.json_ also contains desired /, so it is preceded by \ to not be interpreted as regex termination char
- Desired value can be written as:

```js
.expect('Content-Type', 'application/json')
```

- Issue is that header could have value of _application/json; charset=utf-8_ 
  - Regex circumvents this issue but a string won't
- Will cover `async`, `await`, and `after` later
- Once all tests completed, close db connection used by Mongoose
  - Without this the program won't terminate
  - Can be done using `after` method:

```js
after(async () => {
  await mongoose.connection.close()
})
```

- Recall that the app instance created in _app.js_ does not listen to any ports
  - The instance is then imported into _index.js_, it then listens to a port
- The app instance imported into *note_api.test.js* does not listen to any ports
- This is due to supertest
  - It takes care that the app being tested is started at the port used internally
    - Thus, we do not need to manually run another instance of the server separately before testing
  - Supertest also provides additional functionality such as `expect()`
- Add notes using `mongo.js` 
- More tests:

```js
const assert = require('node:assert')
// ...

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, 2)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert.strictEqual(contents.includes('HTML is easy'), true)
})

// ...
```

- Both tests store response of request in `response` var
  - Instead of using methods of `supertest` for verifying header and content-type, we use assert and strict equal to inspect response data stored in _response.body_ property
- Can simplify second test by using only [assert](https://nodejs.org/docs/latest/api/assert.html#assertokvalue-message):

```js
test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})
```

- using async/await syntax allows us to avoid using callback functions and assign variables to data returned by promises:

```js
const response = await api.get('/api/notes')

// execution gets here only after the HTTP request is complete
// the result of HTTP request is saved in variable response
assert.strictEqual(response.body.length, 2)
```

- Middleware that outputs info on HTTP requests should not execute in test mode:

```js
const info = (...params) => {

  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
}

const error = (...params) => {

  if (process.env.NODE_ENV !== 'test') { 
    console.error(...params)
  }
}

module.exports = {
  info, error
}
```

### Initializing the database before tests

- Currently, success of tests depends on state of db
  - If db has two notes, then test passes
- Will instead reset db and generate needed test data before test
- Tests use `after` to close connection after tests done executing
  - Library node:test offers function to do things before every test, such as `beforeEach`:

```js
const assert = require('node:assert')

const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')

const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

// ...
```

- All notes in db deleted, then new notes stored in `initialNotes` added to db
  - Ensure db is in same state every run
- Modify test that checks number of notes:

```js
test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, initialNotes.length)})
```

### Running tests one by one

- `npm test` command runs all tests
  - Can run one or two tests at a time
- Can do this with `only` method
  - Defines which tests to run in code:

```js
test.only('all notes are returned', async () => {
    //
})
```

- When tests run with option `--test-only` as:

```bash
npm test -- --test-only
```
- Only the tests with `only` will be run
  - Forgetting to remove only is possible
- Can specify tests to run as args in `run test` commands
  - Following runs only tests found in *tests/note_api.test.js* file:

```bash
npm test -- tests/note_api.test.js
```

- --test-name-pattern option runs test with specific name:

```bash
npm test -- --test-name-pattern="a specific note is within the returned notes"
```

- Provided arg can refer to name of test or the describe block
  - Can also contain a portion of the name, and all tests that have that portion in them will be run:

```bash
npm run test -- --test-name-pattern="notes"
```

### async/await

- These use _asynchronous functions that return a promise_ in a way that makes the code look synchronous
- Example of fetching notes from db using promises:

```js
Note.find({}).then(notes => {
  console.log('operation returned the following notes', notes)
})
```

- `Note.find()` returns a promise that can be accessed in the callback function of the `then` method
  - If we want to use several asynchronous function calls in sequence then it becomes [callback hell](http://callbackhell.com/)
- Fixed somewhat by chaining promises:

```js
Note.find({})
  .then(notes => {
    return notes[0].deleteOne()
  })
  .then(response => {
    console.log('the first note is removed')
    // more code here
  })
```

- This can be improved on using `async`/`await`
- Can fetch all notes using `await`:

```js
const notes = await Note.find({})

console.log('operation returned the following notes', notes)
```

- Code looks like synchronous code
- Execution pauses at the first line and waits for the related promise to be _fulfilled_ then goes to the next line
  - When execution continues, result of operation that returns promise is assigned to `notes` variable
- Note deletion example with `await`:

```js
const notes = await Note.find({})
const response = await notes[0].deleteOne()

console.log('the first note is removed')
```

- This code is much simpler
- Few things to note
  - `await` operator can only be used with asynchronous operations and they must return a promise
  - `await` can only be used inside of an `async` function
    - So for previous examples to work, they have to use async functions:

```js
const main = async () => {
  const notes = await Note.find({})
  console.log('operation returned the following notes', notes)

  const response = await notes[0].deleteOne()
  console.log('the first note is removed')
}

main()
```

- Code declared to `main` function will be `async` 

### async/await in the backend

- Change backend to use `async` and `await`
  - Everything is done in functions already, so just change router handler functions into `async` functions
- Routing to fetch notes:

```js
notesRouter.get('/', async (request, response) => { 
  const notes = await Note.find({})
  response.json(notes)
})
```

### More tests and refactoring the backend

- Code got changed, so possibility of regression (existing functionality could break)
- Will refactor other routes and write tests for them
- Write test that adds new note and verifies that the number of notes returned by API increases and that the new note is in the list:

```js
test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  assert.strictEqual(response.body.length, initialNotes.length + 1)

  assert(contents.includes('async/await simplifies making async calls'))
})
```

- Test fails since accidentally returned status code 200 OK when new note created
  - Change to 201 CREATED in the router's route for posting a note:

```js
note.save()
  .then(savedNote => {
    response.status(201).json(savedNote)
  })
  .catch(error => next(error))
```

- Create test for checking that a note without content is not added:

```js
test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, initialNotes.length)
})
```

- Both tests check state stored in db after saving by fetching all notes: `const response = await api.get('/api/notes')`
  - Good to extract these steps into helper function
  - Add into new file *tests/test_helper.js* in same directory as test file:

```js
const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb
}
```

- `notesInDb` used for checking notes stored in db
- `nonExistingId` creates and returns a db object ID that does not belong to any note object in the db
- Import and use the helper module now:

```js
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

after(async () => {
  await mongoose.connection.close()
})
```

- The tests and promises work
- Need to handle errors

### Error handling and async/await

- If there is an error, then we need a way to deal with it
- Use `try` and `catch`:

```js
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})
```

- Catch block calls `next` function to pass execution to error handling middleware 
- Rewrite fetching and removing individual note:

```js
test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})
```
```js
test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  const contents = notesAtEnd.map(n => n.content)
  assert(!contents.includes(noteToDelete.content))

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})
```

- Similar structure to tests
  - Note fetched from db
  - Then test does operation 
  - Finally test verifies outcome
- `deepStrictEqual` is used instead of `strictEqual` 
  - `strictEqual` checks if the objects are the same using method `Object.is`, whereas `deepStrictEqual` compares object's contents
- Refactor tested routes to use `async`/`await`:

```js
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})
```
```js
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})
```

### Eliminating the try-catch

- `async`/`await` reduces clutter, but we have to use try-catch for errors in the same way in our route handlers:

```js
try {
  // do the async operations here
} catch (exception) {
  next(exception)
}
```

- Can use [express-async-errors](https://github.com/davidbanham/express-async-errors)
- Install:

```bash
npm install express-async-errors
```

- Import library in _app.js_ before your routes
- Route for deleting a note can become:

```js
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
```

- Do not need to call `next(exception)`
  - Library automatically calls error handling middleware when error occurs in _async_ route
- Other routes become:

```js
notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
```
```js
notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})
```

### Optimizing the beforeEach function

- Let's optimize the `beforeEach` function:

```js
beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})
```

- There is a better way to save multiple objects to a db:

```js
beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared')

  helper.initialNotes.forEach(async (note) => {
    let noteObject = new Note(note)
    await noteObject.save()
    console.log('saved')
  })
  console.log('done')
})
```

- This does not work since the first test begins before the db is initialized
  - Problem is that each iteration of `forEach` generates its own async operation, but the `beforeEach` function does not wait for their completion
  - So the await commands in the `forEach` are not a part of the `beforeEach` since they are separate functions
  - Also, `forEach` expects a synchronous function
- Solve using `Promise.all`:

```js
beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})
```

- `noteObjects` var assigned to array of Mongoose objects created by `map` method and `Note` constructor
- Next line creates array of promises by calling `save()` method on each note object in `noteObjects`
- `Promise.all()` transforms an array of promises into a single promise that will be fulfilled when every promise in the array is fulfilled
  - `await Promise.all(promiseArray)` waits until every promise for saving a note is finished
    - Returned values can still be accessed using `const results = await Promise.all(promiseArray)`, which will return an array
  - This also executes the promises in parallel
- For promises in particular order, use for...of block:

```js
beforeEach(async () => {
  await Note.deleteMany({})

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }
})
```

- Simpler way using Mongoose method `insertMany`:

```js
beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})
```

### Refactoring tests

- GET and DELETE requests on invalid IDs are not tested yet
- Readability of tests can be improved by grouping tests into _describe_ blocks
- File after improvements:

```js
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
  })

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api.get(`/api/notes/${validNonexistingId}`).expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.get(`/api/notes/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = { important: true }

      await api.post('/api/notes').send(newNote).expect(400)

      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

      const notesAtEnd = await helper.notesInDb()

      const contents = notesAtEnd.map(n => n.content)
      assert(!contents.includes(noteToDelete.content))

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
```