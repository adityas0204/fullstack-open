import { useState } from 'react'
import Filter from './components/Filer'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const duplicate = persons.some((person) => person.name === newName)
    if (!duplicate) {
      setPersons(persons.concat({ id: persons.length+1, name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
      setNewFilter('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const personsToDisplay = newFilter 
  ? persons.filter((person) => person.name.trim().toLowerCase().includes(newFilter.trim().toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>

      <h3>Add a new</h3>

      <PersonForm onSubmit={addContact} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>

      <h3>Numbers</h3>

      <Persons persons={personsToDisplay}/>

    </div>
  )
}

export default App