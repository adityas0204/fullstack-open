# [Forms](https://fullstackopen.com/en/part2/forms)

This section will be done using the example _Notes_ app 

### Saving the notes in the component state

- To update page when notes are added, we will save notes to the _App's_ component state
  - Use `useState` function to do this
  - Initialize with initial notes array passed through props
    - Usually we initialize with empty array or object

```jsx 
import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}
```

- Using React developer tools you can see the hooks state 
- Now, we can make a form for submitting a new note and an event handler
  - Notice that our event handler has an _event_ parameter 
  - The _event_ parameter is passed automatically into our function by the browser
  - It contains important information regarding 
    - What element triggered the event
    - What type of event it was
    - Any data associated with it (e.g. key pressed, mouse position)
    - And importantly: methods to control the default behavior (like `preventDefault()`)

```jsx
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}
```

- When the 'submit' button is pressed, the `addNote` event handler is called 
- Event handler calls `event.preventDefault`
  - This prevents default action of submitting form
    - Default action does [many things](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event) including reloading the page
- Target of the event is stored in `event.target`
- Now we need to access data in form's _input_ element

### Controlled Component

- This is [one method](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable) to access the data
- `newNote` can be a new piece of state to store the input
  - It can be set at the _input_ element's _value_ attribute:

```jsx
const [newNote, setNewNote] = useState('a new note...') 

<input value={newNote} />
```

- We assigned a piece of _App_ component's state as the _value_ attribute of the input, so the _App_ component controls it
  - The input can not be edited by the user
  - To enable editing, we need to register an _event handler_ that synchronizes changes to the state and input:

```jsx
const handleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
}

<input
  value={newNote}
  onChange={handleNoteChange}
/>
```

- Event handler called every time input element is changed
  - `target` value is the value of the element
- Here is what happens step by step:
  1. User types a letter (e.g., types "a").
  2. `onChange` fires and captures the event.
  3. `event.target.value` contains the updated input value (e.g., "a").
  4. `setNewNote` updates React state: `newNote = "a"`.
  5. React re-renders the component.
  6. `<input value={newNote}/>` uses the new value from state ("a").
  7. The user sees the character appear.

- Now finish off `addNote` function:

```jsx
const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    id: String(notes.length + 1),
  }

  setNotes(notes.concat(noteObject))
  setNewNote('')
}
```

- Every note is an object that has content, 50% chance to be important and an ID
  - Concat _noteObject_ to the state _notes_ because concat creates copy of the array with the new item added 
- Event handler also resets value of _newNote_ to `''`

### Filtering Displayed Elements

- `showAll` is a state that keeps track of which notes to display:

```jsx
const [showAll, setShowAll] = useState(true)
```

- We can create a list, `notesToShow` that contains all the notes that need to be displayed
  - The items in the list depend on the `showAll` state:

```jsx
import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)

  // ...

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      // ...
    </div>
  )
}
```

- Conditional operator is used 
  - `const result = condition ? val1 : val2`
- `filter` method filters for important notes only
  - Higher order function
  - Can be reduced to `notes.filter(note => note.important)` since importance is true or false
- Add button to toggle `showAll` state 

```jsx
<div>
  <button onClick={() => setShowAll(!showAll)}>
    show {showAll ? 'important' : 'all'}
  </button>
</div>
```

- Clicking button flips `showAll` state
  - Text uses conditional operator