# [Rendering a collection, modules](https://fullstackopen.com/en/part2/rendering_a_collection_modules)

### Reminders
- Use `console.log()` often to debug
  - In VSC I have made a snippet which easily creates `console.log()` when `clog` is typed 

### JS Arrays
- [Functional Programming Review](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)
  - [Higher-order functions](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84), [Map](https://www.youtube.com/watch?v=bCqtb-Z5YGQ&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84&index=2), [Reduce basics](https://www.youtube.com/watch?v=Wl98eZpkp-c&t=31s)

### Rendering Collections

- This relates to the 'frontend', or the browser side application logic
- Now we will focus on a new application
  - _App.jsx_ and _main.jsx_ can be found in _rendering_
- Every note in `notes` has some information about it
  - We render it using `<li>{notes[1].content}</li>` since notes has exactly three notes
- Another way to render it is using the map function:

```jsx
notes.map(note => <li>{note.content}</li>)
```

- This generates an array of `li` elements:

```jsx
[
  <li>HTML is easy</li>,
  <li>Browser can execute only JavaScript</li>,
  <li>GET and POST are the most important methods of HTTP protocol</li>,
]
```

- This can be easily placed inside of the `ul` tags:

```jsx
<ul> 
  {notes.map(note => <li>{note.content}</li>)}      
</ul>

// can also be written as following for readability
<ul>
  {notes.map(note => 
    <li> 
      {note.content} 
    </li>        
  )}
</ul>
```

- This works because React will appropriately render a list of tags

### Key-attribute

- Each child in a list should have a unique key value
  - When we doing our `map` method shenanigans we need to include the key:

```jsx
<ul>
  {notes.map(note => 
    <li key={note.id}>
      {note.content}
    </li>
  )}
</ul>
```

- Map is a simple function to use that is important to create view elements

### Anti-pattern: Array Indexes as Keys

- The index of an element can be retrieved when using `map` by doing:

```jsx
<ul>
  {notes.map((note, i) => 
    <li key={i}>
      {note.content}
    </li>
  )}
</ul>
```

- `i` is the index, but this method is not recommended since it can lead to more problems later

### Refactoring Modules

- We can also split displaying a single note into its own component _Note_ 
  - This means that the _key_ attribute must be defined for the _Note_ component, and not for the `li` tag as before
  - This is because the _key_ attribute must go to the top level elemnt return by `map`, so the key goes on the _Note_ component here

```jsx
const Note = ({ note }) => <li>{note.content}</li>

const App = ({ notes }) => {
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

- It is commong practice to declare each component in its own file as an _ES6-module_
- First two lines import two modules:

```jsx
import ReactDOM from "react-dom/client"
import App from "./App"
```

- The module _react-dom/_ is placed into the variable `ReactDOM`
- The module _./App_ is placed into the variable `App`
- Lets make _Note_ component its own module
- In small projects, component modules are put in a directory called _components_ in the src folder 
  - The component file is named after the component

```jsx
const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

export default Note
```

- The last line exports the component _Note_
- To import, the location is relative to the file importing
  - `import Note from "./components/Note"`

### When the Application Breaks

- React can have errors:
![alt text](images/react-errors.png)

- Best method to fix issues is using `console.log`
  - Start from the root component, and slowly put more logs deeper into component or function that is causing bugs  
  - Bugs can happen due to props being of different type
