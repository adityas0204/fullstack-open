# [Validation and ESLint](https://fullstackopen.com/en/part3/validation_and_es_lint)

- Want constraints on data stored in db
  - Dont want to add notes with empty _content_ property
  - Check note validity in route handler: 

```js
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  // ...
})
```

- If note's _content_ is missing, then server responds with status code 400 _bad request_
- Can also use validation functionality in Mongoose
  - Can define validation rules for each field in schema:

```js
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})
```

- _minLength_ and _required_ validators are provided by Mongoose
  - We can make custom validators if the built in one are not enough
- If you try to store an invalid note, then operation will throw exception
  - Change code to pass exception to error handler middleware:

```js
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})
```

- Change middleware to reflect validation errors:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
```

- Default Mongoose message is displayed:

![alt text](images/mongoose-error.png)

### Deploying the database backend to production

- Do not need to make another production build since we have only worked on the frontend
- `dotenv` will not work if we are _production mode_ (ie Render)
- For profcution, we have to set the db URL in the service that is hosting out app
  - This is the env var tab in Render