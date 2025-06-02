const PersonForm = ({onSubmit, newName, setNewName, newNumber, setNewNumber}) => {
  return(
    <form onSubmit={onSubmit}>
      <FormInput text='name' newValue={newName} setNewValue={setNewName}/>
      <FormInput text='number' newValue={newNumber} setNewValue={setNewNumber}/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FormInput = ({text, newValue, setNewValue}) => {
  return(
      <div> 
      {text}
      <input
        value={newValue}
        onChange={event => setNewValue(event.target.value)}/>
    </div>
  )
}

export default PersonForm