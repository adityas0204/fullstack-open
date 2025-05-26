# [Component state, event handlers](https://fullstackopen.com/en/part1/component_state_event_handlers)

Example code:

```js
const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}
```

### Component helper functions

- Can put a function in a component
    - Do not need params for helper function since it has access to all props in component:

```js
const Hello = (props) => {

  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

### Destructuring

- Destructuring allows us to streamline our component by assigning values of the props directly into variables
  - Here is an example without destructuring

```js
const name = props.name 
const age = props.age
```

- Here is an example that uses destructuring:

```js
const { name, age } = props
```

- If object that is getting destructured has values as shown below, then  expression `const { name, age } = props` assigns values 'Arto Hellas' to name and 35 to age

```js
props = {
  name: 'Arto Hellas',
  age: 35,
}
```

- It can be taken a step further by destructuring the props that are passed directly into variables:

```js
const Hello = ({ name, age }) => {}
```

### Page re-rendering

- Re-rendering means the page can change after the initial rendering
  - ie. a button can be clicked that updates a counter

_App.jsx_:
```js
const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

export default App
```

_main.jsx_:
```js
import ReactDOM from 'react-dom/client'

import App from './App'

let counter = 1

const root = ReactDOM.createRoot(document.getElementById('root'))

const refresh = () => {
  root.render(
    <App counter={counter} />
  )
}

refresh()
counter += 1
refresh()
counter += 1
refresh()
```

- By calling `render` we can re-render the page with an updated counter
  - This is not recommended though

### Stateful components

- We can add states to components so that they can change during the lifecycle of the component
  - Done using React's state hooks

_main.jsx_:
```js
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

_App.jsx_:
```js
import { useState } from 'react'

const App = () => {

  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App
```

- `import { useState } from 'react'` imports the `useState` function
- `const [ counter, setCounter ] = useState(0)` is a function call that adds state to the component
  - `useState(0)` returns an array, whose elements are assigned to `counter` and `setCounter`
  - `counter` is assigned the initial value of the `state` which is 0
  - `setCounter` is assigned a function used to _modify the state_
- The `setTimeout` function is used to execute code after a certain amount of time
  - It is given a function to increment the counter state and a timeout of one second
- `setCounter` is a state modifying function
  - When called _React re-renders the component_, which means that the function body of the component gets re-executed:

```js
() => {

  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}
```

- Component function is executed again
  - It calls `useState`, which uses current state (which is `counter`), which is 1
    - [After first render](https://react.dev/reference/react/useState#parameters), `useState` uses the current state, not the parameter provided
  - A new function call is made to `setTimeout`, which executes the one-second timeout and increments the `counter` state again to 2
  - The old value of `counter` - 1 - is rendered to the screen
  - Every time `setCounter` modifies the state it causes the component to re-render
  - This will run indefinitely
- You can add a debugging statement: `console.log('rendering...', counter)`

