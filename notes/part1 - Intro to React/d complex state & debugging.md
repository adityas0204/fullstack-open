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
    left:0
    right:0
}
```

- The application would like as so:

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

- `..clicks` creates a new object that has copies of all the properties of original object, then we manipulate the value of `clicks.left`
- Assigning the new object to a variable is not neccessary:

```jsx
const handleLeftClick = () => 
    setClicks({...clicks, left: clicks.left + 1})
```

### Handling arrays

- `allClicks` will remember every click that has occured

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

- Every click is stored in separate piece of state called `allClicks` which is initialized as an empty array
  - When _left_ button clicked, letter _L_ is concated to `allClicks` 
  - `.concat()` method returns copy of array, so we are not mutating original state
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
  - This is due to state updates happening asynchrnously, meaning not immediately but at "some point" before the component is rendered again

```jsx 
const handleLeftClick = () => {
  setAll(allClicks.concat('L'))
  const updatedLeft = left + 1  // store state in variable 
  setLeft(updatedLeft)
  setTotal(updatedLeft + right) 
}
```

### Conditional rendering

