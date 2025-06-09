# [Adding styles to React App](https://fullstackopen.com/en/part2/adding_styles_to_react_app)

Let's take a look at how we can add styles to a React application. There are several different ways of doing this and we will take a look at the other methods later on. First, we will add CSS to our application the old-school way; in a single file without using a [CSS preprocessor](https://developer.mozilla.org/en-US/docs/Glossary/CSS_preprocessor) (although this is not entirely true as we will learn later on).

- Add _index.css_ file in _src_ directory
  - Import into _main.jsx_:

```jsx
import './index.css'
```

- Add a rule to _index.css_:

```css
h1 {
  color: green;
  font-style: italic;
}
```

- That is a rule
  - They have _selectors_ and _declarations_ 
    - Selectors define which element to apply rule to
      - _h1_ header tags will get that rule
    - Declarations give properties values
      - `color` is given value of green
- If we want to style the notes, then we can target the _li_ tags:

```css
li {
  color: grey;
  padding-top: 3px;
  font-size: 15px;
}
```

- Using element types is too general since it applies to all list elements for example
- To be specific, use class selectors
  - Have to define them first in HTML:

```jsx
<li class="note">some text...</li>
```

- Class selectors defined using `.classname` syntax in CSS:

```css
.note {
  color: grey;
  padding-top: 5px;
  font-size: 15px;
}
```

### Improved error message

- Implement error message as component instead of `alert` method:

```jsx
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}
```

- If `message` prop is null, nothing happens
  - Otherwise, the message gets rendered to the screen inside div element
- Use _errorMessage_ state in _App_ component
  - Initialize with message to test it

```jsx
const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  // ...

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      // ...
    </div>
  )
}
```

- Create style for error:

```css
.error {
  color: red;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
```

- Now we can implement it in he function `toggleImportanceOf`:

```jsx
const toggleImportanceOf = id => {
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService
    .update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {

      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
}
```

- When error, show error in epic way and set timer to remove error and fix what caused error

### Inline styles

- React lets you write styles directly into the code 
  - The rules are different from a normal CSS file
- Normally:

```css
{
    color: green;
    font-style: italic;
}
```

- Inline-style: 

```css
{
    color: 'green';
    fontStyle: 'italic';
}
```

- We can see some differences
  - We use quotations around string values
  - CSS uses kebab case for property names, while inline uses camel case

- Create a _Footer_ component for _App_:

```jsx
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic'
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app, Department of Computer Science, University of Helsinki 2025
      </p>
    </div>
  )
}

export default Footer
```

Inline styles come with certain limitations. For instance, so-called [pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) can't be used straightforwardly.

Inline styles and some of the other ways of adding styles to React components go completely against the grain of old conventions. Traditionally, it has been considered best practice to entirely separate CSS from the content (HTML) and functionality (JavaScript). According to this older school of thought, the goal was to write CSS, HTML, and JavaScript into their separate files.

The philosophy of React is, in fact, the polar opposite of this. Since the separation of CSS, HTML, and JavaScript into separate files did not seem to scale well in larger applications, React bases the division of the application along the lines of its logical functional entities.

The structural units that make up the application's functional entities are React components. A React component defines the HTML for structuring the content, the JavaScript functions for determining functionality, and also the component's styling; all in one place. This is to create individual components that are as independent and reusable as possible.