# [props.children and proptypes](https://fullstackopen.com/en/part5/props_children_and_proptypes)

### Displaying the login form only when appropriate

- Modify app so login form not shown until user clicks _login_
  -  User can hit _cancel_ to close form
-  Extract the login form to its own component:

```jsx
const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => (
  <div> 
    <h2>Login</h2>

    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm
```

- Note that we have 'lifted the state up' 
- One way to implement funcitonality that we had discussed is to change `loginForm` function of _App_ component like so:

```jsx
const App = () => {

  const [loginVisible, setLoginVisible] = useState(false)

  // ...

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // ...
}
```

- App has _loginVisible_ state, which defines if login form should be visible or not
- Value of `loginVisible` toggled with two buttons:

```jsx
<button onClick={() => setLoginVisible(true)}>log in</button>

<button onClick={() => setLoginVisible(false)}>cancel</button>
```

- Visibility of component defined by inline style rule
  - If display property is _none_ then component not displayed:

```jsx
const hideWhenVisible = { display: loginVisible ? 'none' : '' }
const showWhenVisible = { display: loginVisible ? '' : 'none' }

<div style={hideWhenVisible}>
  // button
</div>

<div style={showWhenVisible}>
  // button
</div>
```

- Ternary operator used for determining value of _display_

### The components children, aka. props.children

- Code for magaing visibilty of login form can be its own component
  - Its unique
  - Will extract into separate component
- Want to create new _Togglable_ components to use as follows:

```jsx
<Togglable buttonLabel='login'>
  <LoginForm
    username={username}
    password={password}
    handleUsernameChange={({ target }) => setUsername(target.value)}
    handlePasswordChange={({ target }) => setPassword(target.value)}
    handleSubmit={handleLogin}
  />
</Togglable>
```

- This component is different
  - Has both opening and closing tags
  - Tags surround _LoginForm_ component, making it a child component
- Can add any React elements between opening and closing tags:

```jsx
<Togglable buttonLabel="reveal">
  <p>this line is at start hidden</p>
  <p>also this is hidden</p>
</Togglable>
```

- Code for _Togglable_ component:

```jsx
import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
```

- `props.children` is used for referencing child components of the component
  - Child components are the React elementswe define between the tags of the component
- Children rendered in the code used for rendering the component:

```jsx
<div style={showWhenVisible}>
  {props.children}
  <button onClick={toggleVisibility}>cancel</button>
</div>
```

- `children` is a prop automatically added by React
- If component defined with closing tag `/>`:

```jsx
<Note
  key={note.id}
  note={note}
  toggleImportance={() => toggleImportanceOf(note.id)}
/>
```

- Then `props.children` will be an empty array
- This makes _Togglable_ component reusable
- Extract NoteForm into component:

```jsx
const NoteForm = ({  onSubmit, value, handleChange }) => (
  <div>
    <h2>Create a new note</h2>

    <form onSubmit={onSubmit}>
      <input 
        value={value}
        onChange={handleChange}
      />
      <button type="submit">save</button>
    </form>
  </div>
)

export default NoteForm
```

- Define form component inside _Togglable_ component:

```jsx
<Togglable buttonLabel="new note">
  <NoteForm
    onSubmit={addNote}
    value={newNote}
    handleChange={handleNoteChange}
  />
</Togglable>
```

### State of the forms

- State of app is currently in `App` component
- React says if state of two components always change together, then move the state into the closest common component and then pass the state down using props
  - This is called lifting state up
- The state of forms have when a new note is created is not used anywhere else in the `App` component
  - So, we can put it in the `NoteForm` component:

```jsx
import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
```

- `newNote` state var and event handler responsible for changing it have been moved into component responsible for note form
- `createNote` function is called when new note created
- In `App` component, `addNote` function recieves note as param, and this function is passed as prop to note form component:

```jsx
const App = () => {
  // ...
  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }
  // ...
  const noteForm = () => (
    <Togglable buttonLabel='new note'>
      <NoteForm createNote={addNote} />
    </Togglable>
  )
  // ...
}
```

- Also did this type of implementation with the login form

### References to components with ref

 - Want to disappear new note form after new note is created
   - Problem is that _visible_ state is controlled in _Togglable_ component
   - But note form does not have access to _visible_ state 
 - One solution is to move control of _Togglable_ component 
 - Another solution is to use ref mechanism of React
   - Change _App_ component:

```jsx
import { useState, useEffect, useRef } from 'react'

const App = () => {
  // ...
  const noteFormRef = useRef()

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )
  // ...
}
```

- `useRef` hook used to create _noteFormRef_ reference assigned to _Togglable_ component containing creation note form
- _noteFormRef_ var acts as reference to component
  - Will exist and retain value throughout re-renders of component
- Change _Togglable_ component:

```jsx
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable
```

- Function that creates component is wrapped in `forwardRed` function call
  - Component can access ref assigned to it
- `useImperativeHandle` hook makes _toggleVisibilty_ available function available outside component
- Can call `noteFormRef.current.toggleVisibility` in parent component:

```jsx
const App = () => {
  // ...
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {     
        setNotes(notes.concat(returnedNote))
      })
  }
  // ...
}
```