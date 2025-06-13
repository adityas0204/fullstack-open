const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(express.json())

morgan.token('body', (req) => {
	if (req.body && Object.keys(req.body).length > 0) {
		return JSON.stringify(req.body)
	}
	return ''
})


app.use(morgan('tiny :body'))

persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const enteries = persons.length
    const time = new Date()

    response.send(`
        <div>
            <p>Phonebook has infor for ${enteries} people</p>
            <p>${time}</p>
        </div>
        `)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => Math.round((Math.random() * 1000))

app.post('/api/persons', (request, response) => {
    const body = request.body
    const duplicate = persons.some(p => p.name === body.name)

    if (!body.name || !body.number) {
        response.status(400).json({
            "error": "information missing"
        })
    }

    if (duplicate) {
        response.status(409).json({
            "error": "This name exists already"
        })
    }

    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})