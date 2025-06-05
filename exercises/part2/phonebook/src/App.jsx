import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

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