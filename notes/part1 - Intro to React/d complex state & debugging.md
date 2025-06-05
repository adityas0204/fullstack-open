# [A more complex state, debugging React apps](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps)

### Complex state

- For more complex states we can use `useState` multiple times to create separate pieces of state

```jsx
const [left, setLeft] = useState(0)
const [right, setRight] = useState(0)
```

- We would also need two functions, `setLeft` and `setRight`, to update the state 
- We can also achieve this complex state by putting left and right into a single object:

```jsx
{
    left: 0,
    right: 0
}
```

- The application would look as so:

```jsx
const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    const newClicks = { 
      left: clicks.left + 1, 
      right: clicks.right 
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = { 
      left: clicks.left, 
      right: clicks.right + 1 
    }
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}
```

- The event handler creates a new object, adjusts value of the appropriate side and creates a copy of the other side:

```jsx
const handleLeftClick = () => {
  const newClicks = { 
    left: clicks.left + 1, 
    right: clicks.right 
  }
  setClicks(newClicks)
}
```

- This is done because we should never manipulate state itself, but always do it through the `setState` function provided
- This can look prettier with object spread syntax:

```jsx
const handleLeftClick = () => {
  const newClicks = { 
    ...clicks, 
    left: clicks.left + 1 
  }
  setClicks(newClicks)
}
```

- `...clicks` creates a new object that has copies of all the properties of the original object, then we manipulate the value of `clicks.left`
- Assigning the new object to a variable is not necessary:

```jsx
const handleLeftClick = () => 
    setClicks({...clicks, left: clicks.left + 1})
```

### Handling arrays

- `allClicks` will remember every click that has occurred

```jsx
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
    </div>
  )
}
```

- Every click is stored in a separate piece of state called `allClicks` which is initialized as an empty array
  - When _left_ button clicked, letter _L_ is concatenated to `allClicks` 
  - `.concat()` method returns a copy of the array, so we are not mutating original state
  - Do not use `.push()` since it mutates the original state, "which can lead to problems that are very hard to debug"
- `.join()` method joins all items in list into a single string

### Update of the state is asynchronous

- Add state that keeps track of total button presses:

```jsx
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    setTotal(left + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left + right)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>
    </div>
  )
}
```

- The total displayed is always one less than what it should be
  - This is due to state updates happening asynchronously, meaning not immediately but at "some point" before the component is rendered again

```jsx 
const handleLeftClick = () => {
  setAll(allClicks.concat('L'))
  const updatedLeft = left + 1  // store state in variable 
  setLeft(updatedLeft)
  setTotal(updatedLeft + right) 
}
```

### Conditional rendering

- Rendering of click history is handled by new _History_ component:

```jsx
const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div> the app is used by pressing the buttons </div>
  }
  return <div> button press history: {props.allClicks.join(' ')} </div>
}

const App = () => {
  // ...

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}
```

- The _History_ component will render one div element if no buttons have been pressed, or another div element that displays the history
  - This is called _conditional rendering_

### Debugging React applications

- Have the console and code open at the same time at all times
- Put `console.log(props)` in components if there is a problem
  - Can also do `console.log('props value is', props)`
  - Make component less compact, therefore making it more readable:

```jsx
const Button = (props) => { 

  console.log(props)
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
```

- Can also use debugger 
  - LEARN THE DEBUGGER FOR FIREFOX 
- Use `Components` tab provided by React developer tools extension for Firefox
  - It shows props and hooks

### Rules of Hooks

- There are a few [rules](https://react.dev/warnings/invalid-hook-call-warning#breaking-rules-of-hooks)
  - "Hooks may only be called from the inside of a function body that defines a React component"
  - Hooks start with the word `use` 
  - They should not be called from the inside of a loop, conditional expression, or any other place that is not a function defining a component

```jsx
const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

### Event Handling Revisited

- Example:

```jsx
const App = () => {
  const [value, setValue] = useState(10)

  return (
    <div>
      {value}
      <button>reset to zero</button>
    </div>
  )
}
```

- Button should reset state of `value` to 0
  - Must use _event handler_ to make button react to a click event
- Event handlers must always be functions or references to functions
  - If it is not a function, then it will get run when the component is being rendered, not only when the button is clicked
- Here are examples of incorrect event handlers:

```jsx
<button onClick="crap...">button</button>
```
```jsx
<button onClick={value + 1}>button</button>
```
```jsx
<button onClick={value = 0}>button</button>
```
```jsx
<button onClick={console.log('clicked the button')}>
  button
</button>
```
```jsx
<button onClick={setValue(0)}>button</button>
```

- This following example works due to the use of arrow function:

```jsx
<button onClick={() => console.log('clicked the button')}>
  button
</button>
```

- When the component gets rendered, no function gets called and only the reference to the arrow function is set to the event handler
  - Calling the function only happens when the button is clicked
- We can use this to reset the state:

```jsx
<button onClick={() => setValue(0)}>button</button>
```

- Best practice is to define event handlers in a separate place, and make a function reference:

```jsx
const App = () => {
  const [value, setValue] = useState(10)

  const handleClick = () =>
    console.log('clicked the button')

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
```

### A function that returns a function

- Another way to define event handler is _a function that returns a function_
- Make this change to code:

```jsx
const App = () => {
  const [value, setValue] = useState(10)

  const hello = () => {
    const handler = () => console.log('hello world')
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>
    </div>
  )
}
```

- The event handler is set to the function call: 

```jsx
<button onClick={hello()}>button</button>
```

- When the component renders, hello evaluates to `<button onClick={hello()}>button</button>`
  - Which gets evaluated to `<button onClick={() => console.log('hello world')}>button</button>`
- It is important to know the distinction between `handleClick` and `handleClick()` 
  - `handleClick` is a reference to the function, which is what an event handler is looking for
  - `handleClick()` is a function call, which gets executed immediately
  - Because we cannot use function calls in our event handlers, we cannot normally use parameters for our functions
- This is why we need to use functions that return functions
  - This enables us to use parameters in our functions:

```jsx
const App = () => {
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }
  
  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}
```

- Functions that return functions are not necessary for this functionality
  - But it is better practice compared to this:

```jsx
const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>
        thousand
      </button>
      <button onClick={() => setToValue(0)}>
        reset
      </button>
      <button onClick={() => setToValue(value + 1)}>
        increment
      </button>
    </div>
  )
}
```

### Passing Event Handlers to Child Components

- As we have seen previously:

```jsx
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
```
```jsx
const App = (props) => {
  // ...
  return (
    <div>
      {value}

      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

### Reminder: Do not define Components within Components