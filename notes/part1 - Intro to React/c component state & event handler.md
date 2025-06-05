# [Component state, event handlers](https://fullstackopen.com/en/part1/component_state_event_handlers)

Example code:

```jsx
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

```jsx
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

```jsx
const name = props.name 
const age = props.age
```

- Here is an example that uses destructuring:

```jsx
const { name, age } = props
```

- If object that is getting destructured has values as shown below, then expression `const { name, age } = props` assigns values 'Arto Hellas' to name and 35 to age

```jsx
props = {
  name: 'Arto Hellas',
  age: 35,
}
```

- It can be taken a step further by destructuring the props that are passed directly into variables:

```jsx
const Hello = ({ name, age }) => {}
```

### Page re-rendering

- Re-rendering means the page can change after the initial rendering
  - ie. a button can be clicked that updates a counter

_App.jsx_:
```jsx
const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

export default App
```

_main.jsx_:
```jsx
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
```jsx
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

_App.jsx_:
```jsx
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

```jsx
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

### Event handlers

- These are registered to be called when specific events occur
  - For example, when a button is clicked
- We can register an event handler function to the _click_ event as so:

```jsx
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>

      <button onClick={handleClick}>
        plus
      </button>
    </div>
  )
}
``` 

- The button's _onClick_ attribute references `handleClick` function
  - When the _plus_ button is clicked, `handleClick` is called
- We can change the event handler to the following to get the counter behavior:

```jsx
<button onClick={() => setCounter(counter + 1)}>
  plus
</button>
```

### An event handler is a function

- If we tried to define the event handlers in a simpler format, then our application would not work:

```jsx
<button onClick={setCounter(counter + 1)}> 
  plus
</button>
```

- This is because an event handler is supposed to be either a _function_ or a _function reference_
- Good practice is to define event handlers outside of the JSX-templates:

```jsx
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  
  const setToZero = () => setCounter(0)

  return (
    <div>
      <div>{counter}</div>

      <button onClick={increaseByOne}>
        plus
      </button>

      <button onClick={setToZero}>
        zero
      </button>
    </div>
  )
}
```

### Passing state - to child components

- Recommended to use small and reusable React components
  - We will break our components up 
- [Lifting states up](https://react.dev/learn/sharing-state-between-components) in the component hierarchy is good practice
  - So, put app's state in _App_ component and pass it to _Display_ component through _props_:

```jsx
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
```

- This component is easy to integrate and use:

```jsx
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

  return (
    <div>

      <Display counter={counter}/>
      <button onClick={increaseByOne}>
        plus
      </button>
      <button onClick={setToZero}> 
        zero
      </button>
    </div>
  )
}
```

- Now make _Button_ component for buttons:

```jsx
const Button = (props) => {
  return (
    <button onClick = {props.onClick}>
      {props.text}
    </button>
  )
}
```

- Integrating the new buttons into our _App_ component:

```jsx
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter = {counter}/>
      <Button 
      onClick = {increaseByOne}
      text = 'plus'
      />
      <Button 
      onClick = {setToZero}
      text = 'zero'
      />
      <Button 
      onClick = {decreaseByOne}
      text = 'minus'
      />
    </div>
  )
}
```

- In React it is good practice to "use 'onSomething' names for props which take functions which handle events and handleSomething for the actual function definitions which handle those events"

### Refactoring the components

- We can make the components easier to read through refactoring:

```jsx
const Display = ({counter}) => <div> {counter} </div>
```
```jsx
const Button = ({onClick, text}) => <button onClick = {onClick}> {text} </button>
```
