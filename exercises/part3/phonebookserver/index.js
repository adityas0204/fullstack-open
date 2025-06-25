require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const app = express()
const Contact = require('./models/contact.js')

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  if (req.body && Object.keys(req.body).length > 0) {
    return JSON.stringify(req.body)
  }
  return ''
})
app.use(morgan('tiny :body'))

app.get('/info', (request, response) => {
  Contact.find({})
    .then(contacts => {
      const enteries = contacts.length
      const time = new Date()

      response.send(`
				<div>
					<p>Phonebook has info for ${enteries} people</p>
					<p>${time}</p>
				</div>
			`)
    })
})

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      response.json(contact)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  Contact.findOne({ name: body.name })
    .then(contact => {
      if (contact) {
        return response.status(409).json({ error: 'Contact already exists' })
      }

      const person = new Contact({
        name: body.name,
        number: body.number
      })

      return person.save()
        .then(savedContact => {
          console.log(savedContact)
          response.json(savedContact)
        })
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Contact.findById(request.params.id)
    .then(contact => {
      if (!contact) {
        return response.status(404).end()
      }
      contact.name = name
      contact.number = number

      return contact.save().then(updatedContact => {
        response.json(updatedContact)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    console.log('error detected')
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})