import { useState, useEffect } from 'react'
import contactServices from './services/contact'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    contactServices
      .getAll()
      .then(initialContacts => setPersons(initialContacts))
  }
  useEffect(hook, [])

  const addContact = (event) => {
    event.preventDefault()
    const duplicate = persons.some((person) => person.name === newName)

    if (!duplicate) {
      const newContact = { name: newName, number: newNumber }
      
      contactServices
        .create(newContact)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewName('')
          setNewNumber('')
          setNewFilter('')
        })
    } else {
      const person = persons.find((person) => person.name === newName)

      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        contactServices
          .update(person.id, { ...person, number: newNumber })
          .then(updatedContact => {
            setPersons(persons.map(person => person.name === newName ? updatedContact : person))
          setNewName('')
          setNewNumber('')
          setNewFilter('')
          })
      }
    }
  }

  const deleteContact = (id) => {
    const person = persons.find(person => person.id == id)

    if (window.confirm(`Delete ${person.name}?`)) {
      contactServices
      .remove(id)
      .then(deletedContact => {
        setPersons(persons.filter(person => person.id !== deletedContact.id))
      })
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

      <Persons persons={personsToDisplay} deleteContact={deleteContact}/>

    </div>
  )
}

export default App