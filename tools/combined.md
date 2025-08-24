# [Fundamentals](https://fullstackopen.com/en/part0) ([Example app](https://github.com/mluukkai/example_app))

In this part, we will familiarize ourselves with the practicalities of taking the course. After that, we will have an overview of the basics of web development and also talk about the advances in web application development during the last few decades.

### Reminders
1. Open the developer console (ctrl shift i)
2. Open _network tab_
3. Check _disable cache_
4. _Preserve log_ can be useful (preserves logs after reloading site)
5. _Hide extension URLs_ can be useful (hides requests of any extensions installed in the browser)

### Developer Console
- _Network_ tab
  - Shows requests made to server
  - Expand a request for more information
    - _Headers_ tab shows general information such as the request method (GET), status, scheme, content-type and more
    - _Response_ tab shows the response data ie. a regular HTML page
    - Can use this information to determine sequence of events:
- _Console_ tab
  - `console.log` will display things in the console
  - Can use to access DOM notes, such as `document`
  - Can manipulate the page from the console (not permanent)
- _Elements/Inspector_ tab
  - Shows treelike HTML structure
  - Can be used to change style of elements (not permanent)

### Traditional Web Apps
- Static files are HTML documents in your server that ouline the structure and textual context of page
- Server can also form pages dynamically using the application's code ie. from a database
- Nowadays, the browser onle fetches HTML data from server, and all app logic is on server

### Event Handlers & Callback Functions
- Event handlers, as the name suggests, handle certain events by invoking a function
- Event handler functions are called callback functions, meaning the function is invoked by the runtime environment (the browser) at an appropriate time when the event has occured

### Document Object Model (DOM)
- DOM is an Application Programming Interface (API) that lets programmatic changes of treelike HTML structure of webpage
  - ie. adding a list of notes to a page by creating a new node using `ul` and then adding children to it using `li`
- Root node of DOM tree of HTML document is called `document` object

### CSS
- _Head_ element in HTML contains link tag, which tells browser to fetch CSS style sheet from address 
  - Attrbutes can be examined in _Inspector/Elements_ tab
- Class selectors are used to select parts of page and style them
- Classes are attributes 

### HTML 
- Classes are for CSS
- IDs are for JavaScript

### Single Page App (SPA) 
- Fetches only one HTML page from server, the contents of which are manipulated with JavaScript that executes in the browser
# [Introduction to React](https://fullstackopen.com/en/part1/introduction_to_react)

We will now start getting familiar with probably the most important topic of this course, namely the React library. Let's start by making a simple React application as well as getting to know the core concepts of React.

We will use Vite, which can quickly make a React app. It is a frontend development tool, dont know much yet. It has automatic compiling

### Reminders
1. Always have the developer console open

### Components
- Basic UI building blocks in React
  - Follows OOP model 
  - All content that needs to be rendered is done so with components in React
  - **Always have ```export default App```**

```jsx
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)
```

- Component is technically a JS function
  - JSX file allows us to do this
  - Component's variable names must be capitalized
  - ```const App = ()``` assigns the constant variable App to function with no params
  - ```() => {}``` is used to define the [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
  - Function returns the value of the expression after ```=>```
  - It can contain any JS code
  - Components need to have atleast one root element
    - ie. an outermost `<div>` element
    - The root component can contain fragments instead to avoid "extra" div element
      - ie. `<> blah blah blah </>`

```jsx
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}
```

- Can also render dynamic content in component
  - Any JS in expression is evaluated and result is embedded in defined place in HTML
<br>
- You can define multuple components in a single file
  - One component can call another in its expression
  - Components should be specialized and reuseable, similar to classes in Python
<br> 
- There is a _root component_ called _App_ at the top of the component tree  

### JSX
- Layout of React components written in JSX 
  - Looks similar to HTML, but it is a way to write JS, and gets converted into JS after compiling
- JSX is "XML-like" meaning every tag needs to be closed
  - ```<Hello />```

### Props: passing data to components
- Props are used to pass data to components

```jsx
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}
```

- Values for props can be hard-coded, or they can be results of JS expressions
  - If prop value achieved through JS, then it must be wrapped in curly braces

# [JavaScript](https://fullstackopen.com/en/part1/java_script)

JavaScript is essential for React. JavaScript has advanced rapidly in the last few years and in this course, we use features from the newer versions. The official name of the JavaScript standard is ECMAScript. 

Browsers don't yet support all of JS's newest features, so a lot of code run in browsers has been transpiled from a newer version of JavaScript to an older, more compatible version.

Today, the most popular way to do transpiling is by using Babel. Transpilation is automatically configured in React applications created with Vite. 

Node.js is a JavaScript runtime environment based on Google's Chrome V8 JavaScript engine and works practically anywhere - from servers to mobile phones. Let's practice writing some JavaScript using Node. The latest versions of Node already understand the latest versions of JavaScript, so the code does not need to be transpiled.

The code is written into files ending with .js that are run by issuing the command node name_of_file.js

### Variables 
```js
const x = 1
let y = 5

console.log(x, y)   // 1 5 are printed
y += 10
console.log(x, y)   // 1 15 are printed
y = 'sometext'
console.log(x, y)   // 1 sometext are printed
x = 4               // causes an error
```

- `let` defines a normal variable
    - `const` defines a _constant_ variable
- Variable's datatype can change
    - JS is dynamically typed

### Arrays

```jsx
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each on its own line
})                   
```

- Variable assigned to const can not be reassigned, but contents of object it references can be modified
    - "Change the furniture, but the address of the house stays the same"
- Can iterate through array using `forEach`
    - behaves like lambda function from Python
    - `forEach` receives function defined using arrow syntax as param
- The method `push` adds item to array
- For React, we want to stick to immutable data structures paradigm, so prefer method `concat` to create new array with added element:

```jsx
const t = [1, -1, 3]

const t2 = t.concat(5)  // creates new array

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed
```

- Map creates a new array after applying the function given as a param to the old array:

```jsx
const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed
```
```jsx
const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed
```

- Array of numbers is converted into array of HTML strings 
    - Map used frequently in React

- Destructuring assignment used to assign elements of array to variables:

```jsx
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1 2 is printed
console.log(rest)          // [3, 4, 5] is printed
```

### Objects (Dictionary)

- Common way to define objects by using object literals 
  - List properties within braces:

```jsx
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5,
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}
```

- Properties of objects can be referenced using "dot" notation or brackets

```jsx
console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age'
console.log(object1[fieldName])    // 35 is printed
```

- Properties can be added or manipulated in a similar fashion

### Functions

- Arrow method: 

```jsx
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}
```

- For single param you can remove brackets:

```jsx
const square = p => {
  console.log(p)
  return p * p
}
```

- Can be further reduced to the following if we remove console call:
  - The single expression is also returned

```jsx
const square = p => p * p
```

```jsx
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]
```

### Object methods and "this" 

This section is not relevant to the course due to the use of React Hooks, but is good to know.

- Objects have a _this_ keyword which refers to itself: 

```jsx
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',

  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

arto.greet()  // "hello, my name is Arto Hellas" gets printed
```

- Methods can also be assigned after object creation:

```jsx
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}


arto.growOlder = function() {
  this.age += 1
}

console.log(arto.age)   // 35 is printed
arto.growOlder()
console.log(arto.age)   // 36 is printed
```

```jsx
arto.greet()       // "hello, my name is Arto Hellas" gets printed

const referenceToGreet = arto.greet
referenceToGreet() // prints "hello, my name is undefined"
```

- A _method reference_ can be stored in a variable, which will call the method through the variable
  - However, if this is done, then the method loses knowledge of what the original `this` was
  - Calling the method through a reference causes the value of `this` to become the global object, which causes unexpected errors

### Classes

- JS doesn't have classes, but we can simulate them 
  - Here is the syntax for a Person class:

```jsx
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()

const janja = new Person('Janja Garnbret', 23)
janja.greet()
```

- Classes are essentially objects
- This course does not use classes heavily, since we use Hooks

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
# [Rendering a collection, modules](https://fullstackopen.com/en/part2/rendering_a_collection_modules)

### Reminders
- Use `console.log()` often to debug
  - In VS Code I have made a snippet which easily creates `console.log()` when `clog` is typed 

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
  - When we are doing our `map` method shenanigans we need to include the key:

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
  - This is because the _key_ attribute must go to the top level element returned by `map`, so the key goes on the _Note_ component here

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

- It is common practice to declare each component in its own file as an _ES6-module_
- First two lines import two modules:

```jsx
import ReactDOM from "react-dom/client"
import App from "./App"
```

- The module _react-dom/_ is placed into the variable `ReactDOM`
- The module _./App_ is placed into the variable `App`
- Let's make _Note_ component its own module
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
# [Getting data from server](https://fullstackopen.com/en/part2/getting_data_from_server)

For a while now we have only been working on "frontend", i.e. client-side (browser) functionality. We will begin working on "backend", i.e. server-side functionality in the third part of this course. Nonetheless, we will now take a step in that direction by familiarizing ourselves with how the code executing in the browser communicates with the backend.

Let's use a tool meant to be used during software development called [JSON Server](https://github.com/typicode/json-server?tab=readme-ov-file) to act as our server.

- Create _db.json_ file in root directory of _notes_ project
  - Content:

```json
{
  "notes": [
    {
      "id": "1",
      "content": "HTML is easy",
      "important": true
    },
    {
      "id": "2",
      "content": "Browser can execute only JavaScript",
      "important": false
    },
    {
      "id": "3",
      "content": "GET and POST are the most important methods of HTTP protocol",
      "important": true
    }
  ]
}
```

- Run command to start server: `npx json-server --port 3001 db.json`
- From now on, we will save notes to server, and recieve them from the server to render
  - It is like having "memory"
- In real world, databases are used, but JSON Server is nice for small apps

### The browser as a runtime environment

- Need to fetch notes from address http://localhost:3001/notes to React app
  - Can be done using fetch method, based on promises
- JavaScript uses an asynchronous model for most I/O operations  
- This means I/O functions like network requests or file reads are non-blocking
  - Code execution continues immediately after calling an async function  
  - When the operation finishes, the event handler callback is called
- JavaScript engines in browsers and Node.js run in a single thread
  - Only one task can execute at a time  
  - Blocking operations like waiting for a response would freeze the entire app  
  - To prevent this, I/O must be non-blocking and asynchronous
- Summary
  - JavaScript continues running while waiting for I/O to finish  
  - The result of the async task is handled later via callback, promise, or async/await  
  - This design is necessary to keep the UI responsive and the event loop unblocked
- Analogy: Ordering Food
  - Synchronous  
    - You order food  
    - You stand and wait doing nothing until it’s ready  
  - Asynchronous  
    - You order food  
    - You go back to your table  
    - The waiter brings the food when it’s ready  
- JavaScript behaves like the asynchronous model
- Code Comparison
  - Synchronous blocking

  ```js
  const data = fetchData() // blocks  
  console.log(data)        // waits for fetchData to finish  
  ```

  - Asynchronous non-blocking

  ```js
  fetchData().then(data => {
   console.log(data)      // runs later
  })
  console.log("Fetching...") // runs immediately
  ```

	| Feature               | Synchronous Blocking        | Asynchronous Non-blocking JS |
	|----------------------|-----------------------------|-------------------------------|
	| Thread behavior      | Waits for each task to finish | Moves on immediately         |
	| I/O operations       | Block further code          | Run in background             |
	| UI responsiveness    | Can freeze the UI           | Keeps UI responsive           |
	| Example languages    | Java, Python default        | JavaScript, Node.js           |
	| Callback/event model | Not needed                  | Required to handle later results |

### npm

- To get data from server we can use promise-based function fetch
  - Using [axios](https://github.com/axios/axios) instead 
  - It is similar to fetch
- External libraries are called _npm packages_ for React projects
  - Most JS projects defined using not package manager
  - _package.json_ contains information for all libraries and dependencies
- We can install axios by running the command in cmd: 

```
npm install axios
```

- Axios is listed under dependencies in _package.json_
  - The code was also downloaded, and can be found in the _node module_ directory
- Also install _jason-server_ as a development dependency
  - This means it will only be used during development, not when app running in production

```
npm install json-server --save-dev
```

- Make an addition to the _scripts_ portion of _package.json_
  - This will allow us to start the server easily using `npm run server`:

```json
"server": "json-server -p 3001 db.json"
```

- Many more dependencies will be used in the future

### Axios and promises

- Libraries brough into use by calling `import`
- Added following code to _main.jsx_:

```jsx
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
```

- Axios' `get` method returns a promise
  - "A Promise is an object representing the eventual completion or failure of an asynchronous operation."
  - So, promise is object that represents asynchronous operation
  - It can have three states:
    - _Pending_: asynch operation not done yet, so final value not available
    - _Fulfilled_: asynch operation done, so final value available, which means success
    - _Rejected_: error prevented final value from being determined, which means failure 
- _console_ shows that first promise was _fulfilled_, so successful `axios.get()` request
  - Second was _rejected_, and console gives us reason that HTTP GET request to non-existent address
- To access result of operation represented by promise we use event handler
  - Done through `then` method:

```jsx
const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})
```

- Output: 
![alt text](images/successful-promise.png)

- `then` method gets callback function with `response` object as param
  - `response` object carries important returned data of HTTP GET request such as _data_, _status code_, and _headers_
- Promise object generally not stores in variable, instead everything is done in one line:

```jsx
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})
```

- Callback function stores data from `response` object and stores it in variable called notes
- Better way to format chained method is to put then in separate line:

```jsx
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
```

- Data returned by server is plain text (one long string) which axios library can still parse
  - Parses into JS array since server specifies that data format is _application/json_ (see previous image) using content type header
- Now you can use the fetched data
  - Typically the data is fetched in _App_ component

### Effect-hooks

- Effect hooks let component connect to and synchronize with external sysmtems like network, browser DOM and more
  - These are what we will use to fetch data from server
- Simplify _main.jsx_ since we will fetch from server:

```jsx
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

- Change _App_ component:

```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  // ...
}
```

- The console logs tell us that its working:

```
render 0 notes
effect
promise fulfilled
render 3 notes
```

- _App_ component first run
  - `useEffect` registered but function inside not yet run
  - Component is rendered to virtual DOM and all JSX and state is evaluated
- Now that intial render is done, commit phase occur
  - React updates real DOM 
  - React will run the function inside of `useEffect`
    - This is intended to prevent slowing down updates
    - Its also for side effects, not computing what the UI will look like
- This is why 'render 0' is printer to console, followed by logs from within `useEffect` function 
  - When function inside gets executed, `axios.get` starts fetching data from server and registers following function as an _event handler_ for the operation:

```jsx
response => {
  console.log('promise fulfilled')
  setNotes(response.data)
}
```

- When the data arrives from the server, the registered _event handler_ is called 
  - It prints 'promise fulfilled' 
  - Data is stored into notes state using `setNotes(response.data)`
  - Calling a state updating function causes a re-render, which displays the notes
  - This re-render doesn't cause `useEffect` to register again because its dependency array is empty
    - When something in the dependency array changes, React will execute the function in `useEffect`
    - ie. if dependency array was `[notes]` then the _App_ component would be stuck in an infinite loop 
- The code can be rewritten:

```jsx
const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])
```

- `useEffect` takes two params
  1. A function, the effect itself
      > _By default, effects run after every completed render, but you can choose to fire it only when certain values have changed._
  2. Dependency array which specifies how often effect should be run
      - We wanted effect to run after first render only, so we left dependency array empty
      - If no dependency array is provided, then the default action occurs
- The code could also have been written as follows:

```jsx
useEffect(() => {
  console.log('effect')

  const eventHandler = response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  }

  const promise = axios.get('http://localhost:3001/notes')
  promise.then(eventHandler)
}, [])
```

- Next we will store new notes on the server

### The development runtime environment

- Review time
  - Following image describes makeup of app:

![alt text](images/app-makeup.png)

- JS for our app runs on browser, which it gets from the _React dev server_ 
  - That server runs when we run the command `npm run dev`
  - Server tranforms JS into browser understood format 
  - Server stiches together JS from many different files into one file
  - Will be further discussed in Part 7 
- React app on browser gets JSON data from JSON Server running on port 3001 on the machine
  - The server we query the data from (JSON Server) gets its data from db.json
- Currently, everything resides on software developer's machine
  - This is called localhost
  - This will change when app is deployed to internet in Part 3
- 
# [Altering data in server](https://fullstackopen.com/en/part2/altering_data_in_server)

When creating notes in our application, we would naturally want to store them in some backend server. The json-server package claims to be a so-called REST or RESTful API in its documentation:

    Get a full fake REST API with zero coding in less than 30 seconds (seriously)

The json-server does not exactly match the description provided by the textbook definition of a REST API, but neither do most other APIs claiming to be RESTful.

We will take a closer look at REST in the next part of the course. But it's important to familiarize ourselves at this point with some of the conventions used by json-server and REST APIs in general. In particular, we will be taking a look at the conventional use of routes, aka URLs and HTTP request types, in REST.

### REST

- In REST individual objects, such as notes, are resources
  - Every resource has unique address in form of URL
  - JSON Server convention is individual note address is at _notes/3_ where the notes ID is 3 and _notes_ URL is list of all notes
- Resources fetched from server using HTTP GET request 
  - HTTP GET to _notes/3_ URL returns note with ID: 3
  - HTTP GET to _notes_ URL returns list of all notes
- Creating new resource done using HTTP POST request 
  -  For new note, send request to _notes_ URL that JSON server adheres to
  -  Data for new note resource stored in _body_ of request
-  Sending data to JSON Server requires JSON format
   -  Data must be a correctly formatted string and request contains _Content-type_ request header with value _application/json_ 

### Sending Data to the Server

- Change _addNote_ event handler:

```jsx
addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
  }

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
    })
}
```

- Omit id property since it is better handled by the server
  - Server auto generates ids
- Object sent to server using axios `post` method
  - Logged output:

![alt text](images/post-log.png)

- New note resource stored under _data_ property of `response` object 
- Headers for POST request are correct:

![alt text](images/post-headers.png)

- Axios automatically knew to set to appropriate value for _Content-type_ header due to our JS object
- In _Network_ tab, after clicking on an event, the _Request_ tab shows the payload
  - The _Response_ tab shows what the server responded with
- We can cause the note to be rendered to the screen now:

```jsx
axios
  .post('http://localhost:3001/notes', noteObject)
  .then(response => {
    setNotes(notes.concat(response.data));
    setNewNote('');
  });
```

- We `concat` the response data
  - It is how we have always done it
- When working with server, new problems will arise
  - We will need new debugging strategies and console logging
  - Need to have good understanding of JS runtime and React components
- Can inspect state of backend server
  - Can be done through browser, ie. `http://localhost:3001/notes`
- This is discussed further in the next part

### Changing the Importance of Notes

- Add button to every note to toggle importance
- New _Note_ component:

```jsx
const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
```

- This adds a button with event handler `toggleImportance` to every note
- Test it:

```jsx
const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // ...

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
  }

  // ...

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      // ...
    </div>
  )
}
```

- Had to `toggleImportance={() => toggleImportanceOf(note.id)}` since `toggleImportanceOf()` takes a parameter
- Every note has unique event handler since the ids are all unique
- Can modify individual notes in JSON-server in two ways
  1. _replace_ the entire note with HTTP Put request
  2. or change some of note's properties with HTTP Patch request

```jsx
const toggleImportanceOf = id => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  axios.put(url, changedNote).then(response => {
    setNotes(notes.map(note => note.id === id ? response.data : note))
  })
}
```

- First line defines unique URL for note based on id
- `find()` method returns first object that matches condition and stores it in `note` var
- Next, an exact copy of the note is created
  - But the value of `important` is flipped
  - We do not directly manipulate value of notes since it is state, that is why we create a temporary value 
  - `changedNote` is a shallow copy, so the values are the same; however, if the values of the old object were objects, then the copied values in the new object would reference the same objects that were in the old object
- New note sent to server via PUT request, causing it to replace the old note at URL
- Callback function updates `notes` state by keeping all previous items, except for the old note which gets replaced by the updated version
  - This is done using `map`, which returns a new array that has the map applied to it

### Extracting Communication with the Backend into a Separate Module

- To reduce bloating in _App_ component, extract communication into its own module
- Create _src/services_ folder and add file _notes.js_:

```jsx
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}
```

- Module returns object with three functions: `getAll`, `create`, and `update`
  - Return promises made by axios methods
- _App_ component `imports` module:

```jsx
import noteService from './services/notes'
```

- `noteService` can be used:

```jsx
const App = () => {
  // ...

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id === id ? response.data : note))
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  // ...
}
```

- _App_ component receives entire response from HTTP requests
  - Can be trimmed to only receive the _response.data_ since that is all we use:

```jsx
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}
```

- Instead of returning the promise, we assign a var to the promise `request` 
  - Then call `then` on promise and return `response.data`
  - This is compact expression of:

```jsx
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}
```

- `getAll()` still returns a promise since `then` method of promise also returns a promise
  - When `then` is called on the returned promise, it will be returning `response.data`
- Update _App_ component to use response data directly:

```jsx
const App = () => {
  // ...

  useEffect(() => {
    noteService
      .getAll()

      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)

      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)

      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  // ...
}
```

- This uses promise chaining, and you can learn more about it [here](https://javascript.info/promise-chaining)

### Cleaner Syntax for Defining Object Literals

- The module exports the following objects:

```jsx
{ 
  getAll: getAll, 
  create: create, 
  update: update 
}
```

- Since the _keys_ of the object have the same name as the _values_, we can rewrite it as follows:

```jsx
{ getAll, create, update }

// or 

{ 
  getAll, 
  create, 
  update 
}
```

- To demonstrate this, say we have variables with values:

```jsx
const name = 'Leevi'
const age = 0
```

- In older versions of JS we would define object:

```jsx
const person = {
  name: name,
  age: age
}
```

- Since _key_ and _value_ names are same, we can do:

```jsx
const person = { name, age}
```

### Promises and Errors

- Say a note has been deleted from the server, but still appears on the site for the user
  - If the user tries to change that note's importance then there could be issues
  - This would result in the server responding to our HTTP PUT request with a status code 404 _not found_ 
  - The console will display an error
- The app should handle these errors seamlessly
  - User won't know about error unless they look in console
  - They will see that importance of note unable to change  
- Our code doesn't handle a _rejected_ promise
  - Handled by either providing `then` method with second callback function, or more commonly using the `catch` method
- Event handler for rejected promise:

```jsx
axios
  .get('http://example.com/probably_will_fail')
  .then(response => {
    console.log('success!')
  })
  .catch(error => {
    console.log('fail')
  })
```

- If promise fails, then event handler registered with `catch` gets called
  - Generally, `catch` placed further down event chain
  - `catch` can be used to define handler function at the end of a promise chain to catch _rejected_ thrown by any promise in chain
- Can change _App_ component to error check:

```jsx
const toggleImportanceOf = id => {
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService
    .update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    })
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
}
```

- An error message is shown, and the faulty note is removed from the notes state
  - note removed using `filter` method
- We will learn a better way to show messages to user later in the course
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

### Couple of important remarks

This content is worth reading

- Initially, state `notes` is set to empty array
  - `const [notes, setNotes] = useState([])` 
- Since the state stores only one thing, an array, more appropriate initial value is `null`
  - `const [notes, setNotes] = useState(null)`
- This will cause an error in our app where we try to use the `map` method to display the notes
  - The error occurs because the effect is only executed after the first render, so `notes` maintains its `null` value and `map` breaks
- When `notes` is initialized to an empty array, there is no error since `map` can be called on an empty array
  - This masks the issue that data has not been fetched from the server before the first render
- We can use _conditional rendering_ to ensure that on the first render nothing is rendered since notes will be null
  - After the data is fetched the site will be completely rendered again:

```jsx
const App = () => {

  const [notes, setNotes] = useState(null)
  // ... 

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // do not render anything if notes is still null

  if (!notes) { 
    return null 
  }

  // ...
} 
```

- This method is good in cases where it is impossible to define the state so that the initial rendering is possible
- Now, look at the second parameter  of the useEffect:

```jsx
useEffect(() => {
  noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)  
    })

}, [])
```

- `exchangerates` is an app that shows the exchange rates
  - The UI is a form, which has an input field in which the name of the desired currency is written
  - If the currency exists then it is compared to other currencies
- The app sets the name of the currency to the state `currency` when the button is pressed
  - When `currerncy` gets a new value, the app fetches its exchange rates from the API in the event function:

```jsx
const App = () => {
  // ...
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    console.log('effect run, currency is now', currency)

    // skip if currency is not defined
    if (currency) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
        })
    }
  }, [currency])
  // ...
}
```

- `useEffect` hook has `[currency]` as second param
  - So effect function is executed once after first rendering of site, and always after the state `currency` is changed
- Choose `null` for initial value of `currency` since `currency` represents a single item
  - `null` represents the state has nothing and it is easy to check if the state has been assigned yet
  - The efect has a condition:

```jsx
if (currency) { 
  // exchange rates are fetched
}
```

- This prevents the effect from requesting exchange rates just after the first render when `currency` has initial `null` value
- When the user enters a currency, Axios performs an HTTP GET request to https://open.er-api.com/v6/latest/eur 
  - The response is stored in the `rates` state
- This app could have been without using the useEffect function
  - API is requested in the form submit handler function:

```jsx
const onSearch = (event) => {
  event.preventDefault()
  axios
    .get(`https://open.er-api.com/v6/latest/${value}`)
    .then(response => {
      setRates(response.data.rates)
    })
}
```
# [Node.js and Express](https://fullstackopen.com/en/part3/node_js_and_express)

In this part, our focus shifts towards the backend: that is, towards implementing functionality on the server side of the stack.

We will be building our backend on top of NodeJS, which is a JavaScript runtime based on Google's Chrome V8 JavaScript engine.

As mentioned in part 1, browsers don't yet support the newest features of JavaScript, and that is why the code running in the browser must be transpiled with e.g. babel. The situation with JavaScript running in the backend is different. The newest version of Node supports a large majority of the latest features of JavaScript, so we can use the latest features without having to transpile our code.

Our goal is to implement a backend that will work with the notes application from part 2. However, let's start with the basics by implementing a classic "hello world" application.

We had already mentioned npm back in part 2, which is a tool used for managing JavaScript packages. In fact, npm originates from the Node ecosystem.

- Create a directory for app
  - I made _simpleapp_ 
  - Navigate to the directory and create template for new app using `npm init` command
  - Answer the questions and a _package.json_ file will be generated that contains info about the project:

```json
{
  "name": "simpleapp",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": ""
}
```

- File specifies that entry point of app is _index.js_ file
- Add a new script:

```json
{
  // ...
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```

- Add an _index.js_ file at the root of the project
  - Add some code:

```js
console.log('hello world')
```

- Run it:

```bash
node index.js
```

- Or run it using the script:

```bash 
npm start
```

- The script works since we defined it in the _package.json_ file
  - It is normal to have npm scripts for executing tasks for npm projects

### Simple web server

- Make app into web server by editing _index.js_:

```js
const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

- Running the app prints to the console:

```bash
Server running on port 3001
```

- Open app in browser by navigating to http://localhost:3001/
- The first line of code `const http = require('http')` imports Node's built in web server module
  - This is different syntax for `import http from 'http'` 
  - Node.js uses CommonJS modules, which function almost exactly like ES6 modules but Node.js doesn't fully support ES6 modules yet
- The next chunk of code:

```js
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})
```

- `createServer` method of http module used to create a new web server
- _event handler_ is registered to the server
  - It is called every time an HTTP request is made to the server's address http://localhost:3001/
  - This means that whenever someone visits the site, that function is called
- Request is responded to with status code 200
  - _Content-Type_ header set to _text/plain_
  - Content of site to be returned set to 'Hello World'
  - This is because the server returns plain text, which the browser will automatically want to display
    - There are other content types that do other things, for example _text/html_ will render as HTML onto the browser 
- Last lines of code bind the http server assigned to the `app` var, to listen to HTTP requests sent to port 3001
- In this course backend server will offer raw JSON data to front end
  - Change server to return hardcoded list of notes in JSON format:

```js
const http = require('http')


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

- Restart the server and refresh the browser
- _Content-Type_ header is set to _application/json_, which informs the receiver (browser) that the data is in JSON format
  - `notes` array is transformed into JSON formatted string with `JSON.stringify(notes)` method
    - This is necessary since `response.end()` method expects a string or a buffer to send as the response body
- The browser displays a format that is exactly the same as in part 2 where we created a json-server to serve notes:

![alt text](images/json-server.png)

### Express

- This library makes server-side development easier
  - Define it as a dependency:

```bash
npm install express
```

- It will get added to _package.json_
- The source code for the dependency can be found in _node_modules_ directory
  - It will contain the dependencies for express and all the dependencies for those dependencies
    - These are called transitive dependencies
- A caret can exist in front of the version number in _package.json_
  - `"express": "^4.21.2"`
  - npm uses [semantic versioning](https://docs.npmjs.com/about-semantic-versioning), so the caret indicates that Express's version will be at least 4.21.2
- Dependencies can be updated by doing:

```bash
npm update
```

- If working on different computer, install all dependencies:

```bash
npm install
```

- The app should be backwards compatible as long as the _major_ number (number on the left end) is the same

### Web and Express

- Changes to _index.js_ and then restart server:

```js
const express = require('express')
const app = express()

let notes = [
  ...
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

- First, we import `express` 
  - It's a _function_ that we use to create an Express app assigned to `app` var
- Next, two routes to app are defined
  1. First one defines an event handler that handles HTTP GET requests to the app's root
  - The event handler takes two params
    - The first is the request, which contains all info of the HTTP request
    - The second response param is used to define how the request should be responded to 
      - Request answered by using `send` method of `response` object
      - This method causes server to respond to the HTTP request by sending a response that contains the string that was passed in the `send` method
      - Param is a string, so Express automatically adjusts the _Content-Type_ header to be the _text/html_ one
      - Status code of response defaults to 200
      - This can be verified in the _dev tools_ console tab
  2. Second one defines an event handler that handles HTTP GET requests made to the _notes_ path of the app
     - Request responded with json method of `response` object
     - This method _auto_ formats the to JSON formatted string
     - Express _auto_ handles the _Content-Type_ header

### Automatic Change Tracking

- To see change we have to stop the app, and then restart it
- Instead, you can make the server track changes using the `--watch` option:

```bash
node --watch index.js
```

- The browser still needs to be refreshed 
- Make custom script to start development server with tracking:

```json
"dev": "node --watch index.js"
```

- Run it using:

```bash
npm run dev
```

- We have to use run here since `dev` isn't a built in script
  - Start is an exception to this rule

### REST

- Update app to provide same RESTful HTTP API as json-server (what we used to use in part 2)

>Representational State Transfer, aka REST, was introduced in 2000 in Roy Fielding's dissertation. REST is an architectural style meant for building scalable web applications.

- In REST, singular things, like notes, are called _resources_ 
  - Every resource has an associated URL which is the resource's unique address
- A convention for unique address is combining the name of the resource type with the unique identifier
  - Assume root URL of service is _www.exampleapp.com/api_
  - If resource type is notes, then address of unique note 10 is _www.exampleapp.com/api/notes/10_ 
  - URL for whole collection is _www.exampleapp.com/api/notes_
- Different operations can be done on resources
  - Operation depends on HTTP _verb_:

| URL       | Verb   | Functionality                                                      |
|-----------|--------|---------------------------------------------------------------------|
| notes/10  | GET    | Fetches a single resource                                           |
| notes     | GET    | Fetches all resources in the collection                             |
| notes     | POST   | Creates a new resource based on the request data                    |
| notes/10  | DELETE | Removes the identified resource                                     |
| notes/10  | PUT    | Replaces the entire identified resource with the request data       |
| notes/10  | PATCH  | Replaces a part of the identified resource with the request data    |

- This defines a uniform interface, which is a consistent way to define interfaces to allow cooperation between systems

### Fetching a single resource

- Add REST interface to operate on individual notes
  - First, create route for fetching single resource
- Unique address will use an individual note's unique number 
- Define parameters for routes using colon syntax in Express:

```js
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  response.json(note)
})
```

- This 'function' will handle all HTTP GET requests of the form _/api/notes/SOMETHING_ where _SOMETHING_ is an arbitrary string
- _id_ param accessed through request object's `params` method
- The note is found using `find` 
  - It is returned in the response
- If non-existent note is requested, then HTTP status code 200 is returned, meaning success
  - No data was sent back though
  - This is due to `note` var being set to `undefined` if no match is found
  - The server needs to return status code 404 not found instead

```js
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
```

- We can use the `status` method to set the status, and the `end` method to respond to the request without sending any data
- The app doesn't return anything to show to user
  - We can give them a clue by overriding the default NOT FOUND message

### Deleting resources 

- Create route to delete resources
  - HTTP request is made to DELETE request to URL of resource:

```js
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```

- If resource deletion is successful, then respond to request with status code 204 no content
  - Return no data 

### Postman

- Could write JS code to test deletion
  - CMDL program, [curl](https://curl.se/), makes this easier
  - Will use [Postman](https://www.postman.com/) instead
- Postman is easy to use in this simple case 
  - It also has a VSCode extension
  - Just select the _DELETE_ verb and give it the URL of the note to delete
  - HTTP GET on that URL shows that Postman worked and that note has been deleted

### The Visual Studio Code REST client

- Can use VSC REST client plugin instead of Postman
- Make directory at root of app called _requests_ 
  - Save all REST client requests in directory as files with _.rest_ extension

![alt text](images/vsc-rest-client.png) 

- After clicking _Send Request_ another window will open with the HTTP response from the server

### Receiving data

- Add new notes by making HTTP POST request to address http://localhost:3001/api/notes
  - Send all info for new note in the request body in JSON format
  - To access data easily, use Express json-parser with command `app.use(express.json()) `:

```js
const express = require('express')
const app = express()

app.use(express.json())

//...

app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note)
})
```

- Event handler accesses data from body of `request` object
  - Without json-parser, _body_ property would be undefined
  - Parser takes JSON data, transforms it into JS object and attaches it to the _body_ property of `request` before handler is called
- Verify it works with Postman
  - Postman shows what returns at the bottom of its UI
- New test can be made in REST client file:

```rest
POST http://localhost:3001/api/notes/
Content-Type: application/json

{
    "content": "postman good testing",
    "important": true
}
```

- [Multiple tests can also be put in one file](https://github.com/Huachao/vscode-restclient/blob/master/README.md#usage):

```rest
GET http://localhost:3001/api/notes/

###

POST http://localhost:3001/api/notes/ HTTP/1.1
content-type: application/json

{
    "name": "sample",
    "time": "Wed, 21 Oct 2015 18:27:50 GMT"
}
```

- When debugging, headers can be seen by doing `request.headers` or `request.get('content-type' or specify other headers)`
- Complete handling the request for new note:

```js
app.post('/api/notes', (request, response) => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => Number(note.id))) 
    : 0

  const note = request.body
  note.id = String(maxId + 1)

  notes = notes.concat(note)

  response.json(note)
})
```

- Need unique id for note
  - First, get largest id number
  - Then create note from `request.body` 
  - Add one to the largest id to determine new note's id
    - Not recommended method
- HTTP POST request can add notes with arbitrary properties
  - Make it so _content_ property of note can not be empty
  - _important_ property will be false by default
  - All other properties are discarded

```js
const generateId = () => {
  const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'missing content'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  notes = notes.concat(note)

  response.json(note)
})
```

- Server responds to request with 400 bad request if no content provided
  - Notice that `return response.status(400).json({})` uses a return
  - Return prevents rest of the code from being executed and a faulty note being added
- The _important_ property is created in a particular way
  - Uses || to check if `body.important` is truthy; if not, it falls back to false
  - || returns the first truthy value from left to right
  - Ensures a value is always assigned, even if the field is missing
- Since our ids are stored as strings, we have to use map to convert them to numbers first
  - The spread syntax turns `Math.max(...[1, 2, 3])` into `Math.max(1, 2, 3)`

### About HTTP request types

- Request types have two important properties: safety and idempotency
- An HTTP GET request should be safe
  - This means that it does not cause any side effects on the server and only data is retrieved; the state of the database should not change
  - Nothing guarantees a request to be safe, but it is a recommendation
  - Safe also applies to HEAD
- All HTTP requests should be idempotent (except for post)
  - If a request does not generate side effects, then the result of the request should be the same no matter how many times the request is sent
- POST is neither safe nor idempotent

### Middleware

- These are functions that handle `request` and `response` objects
- Express json-parser is middleware
  - It takes in raw data from requests stored in `request` object, parses it into JS object and assigns it to `request` object as a new property `body`
- Can use multiple middlewares
  - They are called in the order they are listed in the code
- Create middleware to print request info
- Middleware function receives 3 parameters:

```js
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
```

- At end of function, `next` function is called
  - `next` yields control to the next middleware
- Middleware is used like this:

```js
app.use(requestLogger)
```

- `json-parser` listed before `requestLogger` to initialize `request.body`
- Middleware functions have to be used before routes
  - Can be called after route if no route handler processes the HTTP request
  - Make middleware to catch requests made to non-existent routes:

```js
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
```
# [Deploying app to internet](https://fullstackopen.com/en/part3/deploying_app_to_internet)

- We will connect the _notes_ app frontend to the backend 
- Frontend could ask for notes from json-server backend on address http://localhost:3001/notes
  - New backend has different structure, and notes at http://localhost:3001/api/notes
- Change `baseUrl` var to reflect this:

```js
const baseUrl = 'http://localhost:3001/api/notes'
```

- The frontend's GET request does not work
  - Why error?

### Same origin policy and CORS

- Problem with `same origin policy`
- URL's origin defined by combo of protocol (scheme), hostname, and port

```
http://example.com:80/index.html
  
protocol: http
host: example.com
port: 80
```
- CORS and Same-Origin Policy
  - When visiting a website (e.g. http://example.com), the browser makes a request to the server that hosts the domain.
    - The server responds with an HTML file, which may contain references to external assets (images, CSS, JS).
    - These assets may be on:
      - the same server
      - or a different server/domain (cross-origin)
- Same-Origin Policy
  - Browsers implement a same-origin policy to protect users from security threats (e.g. session hijacking).
  - Two URLs are considered the same origin if they share:
    1. Scheme (http vs https)
    2. Host (e.g. example.com)
    3. Port (e.g. :3001)
  - If a resource (script, data, etc.) is not from the same origin, the browser will:
    - Check if the server allows it using the Access-Control-Allow-Origin response header.
    - If the header contains * or the correct origin → allow the request
    - If the header is missing or incorrect → block the request and show a CORS error
- CORS (Cross-Origin Resource Sharing)
  - CORS is a mechanism defined by W3C that allows a server to permit cross-origin requests.
  - CORS enables:
    - Embedding images, stylesheets, scripts, iframes, videos from other origins
  - CORS restricts by default:
    - JavaScript (e.g. fetch, XMLHttpRequest) from making cross-origin requests unless explicitly allowed by the server
- Problem arises due to our server being on localhost port 5173, but our frontend being on port 3001
  - The origin is different
- Can allow requests from other _origins_ through Node's cors middleware
  - Install cors in backend: `npm install cors`
  - Use the middleware and allow requests from all origins:

```js
const cors = require('cors')

app.use(cors())
```

- Be intentional when enabling cors
  - In production, backend shouldn't be visible to public, so only enable cors from specific origin
    - Such as frontend
- Almost all functionality works, except for changing importance due to not being implemented in the backend yet
- App setup:

![alt text](images/app-setup.png)

- React app fetches data from node/express-server running on localhost:3001

### Application to the Internet

- Move app to internet since stack is ready
- Will use PaaS (Platform as a Service)
  - Allows user to not worry about underlying infrastructure
  - Can use [Heroku](http://heroku.com/) (student plan is alright), [Fly.io](https://fly.io/), [Render](https://render.com/), [Replit](https://replit.com/), or [CodeSandBox](https://codesandbox.io/)
  - Will stick to Render in this course
- For Render, we need to change definition of the port our app uses in `index.js`:

```js
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

#### Render

- Create a new _Web Service_

![alt text](images/render-new-webservice.png)

- Connect a public repo
- Define basic configs
  - If app is not at root of repo, then _Root directory_ needs to be given proper value:
    - The app in question is the server that we had created:

![alt text](images/render-configs.png)

- Go to the bottom and click _Deploy_ 
- App will get deployed and it will inform you what the link is and the port:

![alt text](images/render-logs.png)

- After pushing to your repo, you can redeploy the app:

![alt text](images/render-redeploy.png)

### Frontend production build

-  We have been running React in _development mode_
   -  App gives clear error logs, renders code immediately to browser, and so on
-  When app is deployed, need to create a production build
   -  Version of app is optimized for production
-  Production build for Vite apps done with `npm run build`
   -  Run in frontend of notes app from part 2
-  A _dist_ directory is created
   -  Contains _index.html_ file of our app and _assets_ directory
   -  Minified versions of our app's JS code will be in _dist_ directory
   -  Minified code is not readable

### Serving static files from the backend

- An option to deploy frontend is to copy the production build (_dist_ directory) to root of backend directory
  - Then configure backend to show frontend's _main page_ (_dist/index.html_ file) as its main page
- Start by copying production build (_dist_ directory) of frontend to root of backend:

![alt text](images/production-build.png)

- To make Express show _static content_ (page _index.html_ and JS), need to use built in middleware from Express called static:

```js
app.use(express.static('dist'))
```

 - When Express gets HTTP GET request, it will first check if _dist_ directory contains file corresponding to request's address 
   - File returned if found
 - "Now HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will show the React frontend. GET requests to the address www.serversaddress.com/api/notes will be handled by the backend code."
 - Now, frontend and backend are at same address, so declare `baseUrl` as relative URL
   - Leave out part declaring server:

```js
import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// ...
```

- After change, create new production build of frontend, copy it to root of backend
- App can now be used from the _backend_ address http://localhost:3001/
- When browser goes to address http://localhost:3001/, server returns _index.html_ file from _dist_ directory
  - Contents of file:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
    <script type="module" crossorigin src="/assets/index-DvWJzEIY.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-DdXI-Iuh.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

- File has instructions to fetch CSS stylesheet, and one _script_ tag that instructs the browser to fetch the JS code of the app - the actual React app
- React code fetches notes from the server address http://localhost:3001/api/notes and renders them to screen
  - Browser-server communication can be seen in _Network tab_ of developer console
- Setup for product deployment:

![alt text](images/setup-deployment.png)

- Everything in same node/express-backend that runs in localhost:3001
  - This is unlike our development environment
- When browser goes to page, _index.html_ is rendered
- Which causes browser to fetch production version of React app
- Once starting, it fetches the json-data from address localhost:3001/api/notes

### The whole app to the internet

- Push the app to git and manual deploy on Render again
  - The app now works
- Everything is saved to a variable, if app restarts, then the data disappears
  - We need a database
- The setup of the app looks like the following:

![alt text](images/render-deployment.png)

- The backend resides in the Render server
  - The browser executes the React app and fetches the json-data from the Render server

### Streamlining deploying of the frontend

- To reduce manual work when creating production build, create npm-scripts in _package.json_ of backend repo
- The script for Render is:

```json
{
  "scripts": {
    //...
    "build:ui": "rm -rf dist && cd ../frontend && npm run build && cp -r dist ../backend",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push"
  }
}
```

- "The script npm run build:ui builds the frontend and copies the production version under the backend repository. npm run deploy:full contains also the necessary git commands to update the backend repository"
- "Note that the directory paths in the script build:ui depend on the location of the frontend and backend directories in the file system."

### Proxy

- Changes to the frontend cause it to not work in dev mode when using `npm run dev`
  - Connection to backend is frayed since we use a relative URL:

```js
const baseUrl = '/api/notes'
```

- Frontend is at http://localhost:5173/
  - So requests go to http://localhost:5173/api/notes
  - But backend is at http://localhost:3001/
- If project created using Vite, then add following to _vite.config.js_ file in frontend directory:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
```

- React dev env acts as proxy
  - If React code makes HTTP request to path starting with http://localhost:5173/api, then request forwarded to server at http://localhost:3001/
- Frontend works in development mode and production build
  - From frontend's perspective, all requests made to http://localhost:5173/, which is single origin, so no need for backend's cors middleware
- Remove cors library and dependency:

```bash 
npm remove cors
```

- The app has been successfully deployed

# [Saving data to MongoDB](https://fullstackopen.com/en/part3/saving_data_to_mongo_db)

### Debugging Node applications

- Can always `console.log()` 
  - Will look at other methods too

#### VSC

- Can start debugger from `Run` in toolbar at top
- Can also go to `Run and Debug` panel on left side
  - Then select `Node.js` from dropdown and choose the `start` config
  - This will attach a debugger to the `npm start` script
  - More recommended because this will launch the app more appropriately

![alt text](images/debug-dropdown.png)

- Breakpoints can be added to pause execution

#### Dev tools 

- Debugging can also be done in dev console

#### Question everything

- Bugs can exist anywhere in your code
  - Be systematic and eliminate all possibilities one by one
    - Use the console logging, Postman, and debuggers 

### MongoDB

- Will use MongoDB to save notes indefinitely
- Will use MongoDB Atlas
  - This is a MongoDB service provider that gives cloud storage 
  - Create a free account and create a new, free cluster after selecting the cloud provider and data center

![alt text](images/new-cluster.png)

- You will be greeted with a popup to create user credentials for the db
  - These will be used by your app to connect to the db
  - This can also be done in the _Quickstart_ menu

![alt text](images/new-user.png)

- In _Network Access_, add a new IP address, and allow connection from anywhere for simplicity
- Now, connect to the db
  - Need db connection string, found by selecting _Connect_ then _Drivers_ in the _Clusters_ section
  - This will show the _MongoDB URI_, which is the address of the db that we will give to MongoDB client library in our app:

![alt text](images/mongodb-uri.png)

- Can now use the db
  - Could do directly from JS code with Official MongoDB Node.js driver library 
  - Will instead use Mongoose library that offers higher level API
- Mongoose is an _object document mapper_ (ODM)
  - Lets us easily turn JS objects into MongoDB documents
- Install Mongoose into the backend:

```bash
npm install mongoose
```

- Create practice app by making file _mongo.js_ in root of notes backend app
- Use the URI generated from MongoDB Atlas
- Code should also be passed password as command line arg:

```js
const password = process.argv[2]
```

- Run code with command _node mongo.js yourPassword_, which will cause Mongo to add a new document to the database
  - The password to be inputted is the database user's password
- The inputted document can be viewed under _Browse Collections_ in _Clusters_

![alt text](images/collection.png)

- Drop default db _test_, and change name of db in connection string to _noteApp_ by modifying URI:

```js
const url = `mongodb+srv://fullstack:${password}@cluster0.bvak88w.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
```

- After running command once more:

![alt text](images/new-db.png)

- MongoDB Atlas automatically creates a db when an app tries to connect to a nonexistent db

 ### Schema

 - Make schema for new note and matching model:

```js
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```

- `noteSchema` var defines the schema for a note
  - Tells mongoose how note objects are to be stored in the db
- In the `Note` model definition, _'Note'_ is the singular name of the model
  - Name of collection will automatically be named lowercase plural _notes_ 
  - Mongoose convention to name collections as plural, whereas schema should refer to them in singular
- MongoDB is schemaless

### Creating and saving objects

- Create new note object with _Note_ model:

```js
const note = new Note({
  content: 'HTML is Easy',
  important: false,
})
```

-  Models are constructor functions
   -  Create new JS objects based on given params
   -  Objects have all properties of model
      -  Includes method to save object to db 
-  `save` method saves object to db
   -  Returns a promise that can be resolved by the event handler in the `then` method

```js
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```

- The connection remains open till the program terminates, or `mongoose.connection.close()` is called
- Result of operation stored in `result` param

### Fetching objects from the database

- This code will return all the notes in the db:

```js
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
```

- The output is as follows:

```js
{
  _id: new ObjectId('6854bae6e3b8d2a55fee9e6f'),
  content: 'HTML is easy',
  important: true,
  __v: 0
}
```

- `find` takes searching conditions as params
  - Similar to what is typically done in MongoDB:

```js
Note.find({ important: true }).then(result => {
  // ...
})
```

### Connecting the backend to a database

- Will use mongo in notes app
  - Copy paste definitions into _index.js_ first:

```js
const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```

- Change event handler for fetching all notes:

```js
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
```

- Visiting http://localhost:3001/api/notes displays the notes from the db as expected
- We do not want to show the versioning field *__v* and the *_id*
  - Can modify objects returned by Mongoose using `toJSON` method of schema:

```js
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
```

- This is basically saying that any notes created from this schema (all the notes returned from the db) should follow this behaviour when `toJSON` is called on them
  - The method `json()` actually calls `toJSON` 
  - The second parameter is an object, which will have the key `transform` specifically
  - A function will take the returned object and turn the id into a string since `_id` is an object
  - Then the `_id` and `__v` keys will get deleted
  - It manipulates `returnedObject` in place
- No changes need to be made to the handler for fetching all notes

### Moving db configuration to its own module

- Extract Mongoose code into own file
  - Create directory for the module called _models_ and add a file called _note.js_:

```js
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
```

- Few changes
  - Hardcoding URL is not a good idea, so it is passed as MONGODB_URI env var
    - Can define value of env var on start up: `MONGODB_URI="your_connection_string_here" npm run dev`
  - Making a connection logs messages on success or failure
- Defining node modules differs from ES6 modules
  - Public interface of module is defined by setting value to `module.exports` 
    - We set the value to be _Note_ model
    - Other things inside of the module will not be accessible to users of the module
  - Import module into _index.js_:

```js
const Note = require('./models/note')
```

- The _Note_ var is assigned to the same object that the module defines

### Defining environment variables using the dotenv library

- Install the `dotenv` library 
- Create a _.env_ file at the root of your project
- Define env vars:

```
MONGODB_URI=mongodb+srv://fullstack:thepasswordishere@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
```

- Git ignore this file
- Use these env vars by doing `require('dotenv').config()`
  - Reference env like normal env vars: `process.env.MONGODB_URI`
- Load env vars at the top to use them throughout:

```js
require('dotenv').config()
const express = require('express')
const Note = require('./models/note')
const app = express()
// ..

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

- Important to import _dotenv_ before _note_ module to allow env vars to be used globally
- Since we have gitignore _.env_ file, when using Render we must still provide the env var
  - It is done through their dashboard:

![alt text](images/render-env.png)

### Using database in route handlers

- Change rest of functionality to link with db
- New note code:

```js
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
```

- Note created using _Note_ model
- It is saved to the db
  - _savedNote_ is the returned note that is formatted automatically by our `.set` rule when `toJSON` is called (which is called by `.json()`)
- Use Mongoose's `findById` method for fetching individual note:

```js
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})
```

- Error checking will be introduced later

### Verifying frontend and backend integration

- Since we made changes to the backend, test using Postman or VS Code REST client by making a new note:

![alt text](images/backend-test.png)

- Inefficient to test the frontend before the backend 
  - That is why tools like Postman and VS Code REST client are good

### Error handling

- If a non-existent note is visited, then the response from the db is null
  - Instead, the server should respond with HTTP status code 404 not found
  - Also include a `catch` to handle promises returned by `findById` that are rejected:

```js
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})
```

- If matching note not in db, then `null` value will be returned by db, then HTTP status code 404 sent in response
- If promise of `findById` rejected, then response will have status code 500 _internal server error_
- Need to handle case of incorrect id that is not Mongo style
  - If malformed id provided, callback function in `catch` will be called
  - Change the `catch`:

```js
.catch(error => {
    console.log(error);
    response.status(400).send({ error: 'malformatted id' });
})
```

- Status code 400 Bad Request is most appropriate since:

> The 400 (Bad Request) status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).

- Always log the error to the console to have additional info regarding the problem
- It is also important to look at the server output in the terminal

### Moving error handling into middleware

- Error handling is written among rest of code, which is fine
  - Can also implement all of it in one place instead
    - Can be useful for error-tracking through [Sentry](https://sentry.io/welcome/)
- Change event handler for fetching a specific note
  - It will pass error forward with `next` function, and `next` becomes third param:

```js
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
```

- Error is given to `next` function as param
  - If `next` called without argument, execution would move onto next route or middleware
  - With params, execution continues to _error handler middleware_
- Express error handlers are middleware that are defined with a function that takes four params
  - Ours:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
```

- If there is a _CastError_ exception, then we know it's due to invalid object id for Mongo
  - If not this error, then handler passes execution to default Express error handler
- Note that this errorHandler should be the last loaded middleware and all other routes should be registered before this
  - If you want to check for more errors, then include more `if` statements

### The order of middleware loading

- Important to load middleware in order of use in Express
- Correct order:

```js
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.post('/api/notes', (request, response) => {
  const body = request.body
  // ...
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // ...
}

// handler of requests with result to errors
app.use(errorHandler)
```

- Use _jsonParser_ at top since it is used in the other routes
- `unknownEndpoint` catches endpoints that don't exist 
  - It displays an error after all the existing routes have been checked

### Other operations

- Add some functionality
  - Such as deleting and updating a note
- Easiest way to delete note is with `findByIdAndDelete` method:

```js
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
```

- In both 'successful' cases of deleting a resource, backend responds with status code 204 _no content_ 
  - Deleting a note that exists and one that does not are the cases
  - `result` param could be used to check if resource was actually deleted
    - Could use info for two cases 
- Implement updating a single note:

```js
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})
```

- Note to be updated is fetched from db using `findById` method
  - If it doesn't exist, then status code 404 _Not found_ is sent in the response
- If note found, then `content` and `important` fields are updated with data in `request` object
  - Then, note saved to db using `save` 
  - HTTP request responds by sending updated note in response
- There is a nested promise chain
  - This works since the return literally returns a promise, forcing the outer `then` to
# [Validation and ESLint](https://fullstackopen.com/en/part3/validation_and_es_lint)

- Want constraints on data stored in db
  - Don't want to add notes with empty _content_ property
  - Check note validity in route handler: 

```js
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  // ...
})
```

- If note's _content_ is missing, then server responds with status code 400 _bad request_
- Can also use validation functionality in Mongoose
  - Can define validation rules for each field in schema:

```js
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})
```

- _minLength_ and _required_ validators are provided by Mongoose
  - We can make custom validators if the built-in ones are not enough
- If you try to store an invalid note, then operation will throw exception
  - Change code to pass exception to error handler middleware:

```js
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})
```

- Change middleware to reflect validation errors:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
```

- Default Mongoose message is displayed:

![alt text](images/mongoose-error.png)

### Deploying the database backend to production

- Do not need to make another production build since we have only worked on the backend
- `dotenv` will not work if we are in _production mode_ (i.e. Render)
- For production, we have to set the db URL in the service that is hosting our app
  - This is the env var tab in Render

### [Lint](https://en.wikipedia.org/wiki/Lint_(software))

> Generically, lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.

- Best static analysis ("linting") tool for JS is [ESLint](https://eslint.org/)
- Add as a _development dependency_ meaning it is not needed for production in the backend:

```bash
npm install eslint @eslint/js --save-dev
```

- It appears as so in _package.json_:

```js
"devDependencies": {
  "@eslint/js": "^9.29.0",
  "eslint": "^9.29.0"
}
```

- Initialize default ESLint config with command:

```bash
npx eslint --init
```

- Answer the questions:

![alt text](images/lint-setup.png)

- Configuration is saved in generated `eslint.config.mjs` file

### Formatting the Configuration File

- Format `eslint.config.mjs` to the following:

```mjs
import globals from 'globals'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
  },
]
```

- ESLint config file defines `files` option with `["**/*.js"]` 
  - This tells ESLint to look at all JS files 
- `languageOptions` property specifies options related to language features that should be expected
  - Define `sourceType` option as "commonjs", which indicates that JS code in project uses CommonJS module system
  - `globals` option specifies predefined global vars
    - spread operator tells ESLint to include all global vars defined in `globals.node` settings such as `process` 
  - `ecmaVersion` is set to latest, which sets the ECMAScript version to latest so ESLint knows to expect the latest JS syntax and features
- Want to use [ESLint's recommended settings](https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations) with ours
  - `@eslint/js` package we installed provides us with predefined configs
  - We can import them:

```mjs
import globals from 'globals'
import js from '@eslint/js'
// ...

export default [
  js.configs.recommended,
  {
    // ...
  },
]
```

- Since the recommended configs are at the top of the array, they will be applied first
- Install plugin for code style-related rules:

```bash
npm install --save-dev @stylistic/eslint-plugin-js
```

- Import and enable plugin, add four code style rules:

```mjs
import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  {
    // ...
    plugins: { 
      '@stylistic/js': stylisticJs,
    },
    rules: { 
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    }, 
  },
]
```

- Plugins extend ESLint capabilities
- `@stylistic/eslint-plugin-js` adds JS stylistic rules 
  - Also indent, linebreak, quotes, and semicolons

### Running the Linter

- Inspecting and validating a file such as `index.js` can be done with the following command:

```bash
npx eslint index.js
```

- Recommended to create separate `npm script` for linting:

```js
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint ."
    // ...
  },
  // ...
}
```

- `npm run lint` will check every file in the project
  - Files in the `dist` directory will also get checked
  - To avoid this, add an object with ignores property:

```mjs
// ...
export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    // ...
  },

  { 
    ignores: ['dist/**'], 
  },
]
```

- Can use the VS Code ESLint plugin

### Adding More Style Rules

- eqeqeq rule checks if triple equality is used
  - Add it to config file:

```mjs
export default [
  // ...
  rules: {
    // ...
   eqeqeq: 'error',
  },
  // ...
]
```

- Add rules for
  - Unnecessary trailing spaces
  - Require space before and after curly braces
  - Consistent use of white space in function params for arrow functions
- Imported default config has many rules
  - Includes rule that warns of `console.log` commands, which we don't want
  - Remove by defining its value as 0 or `off`:

```mjs
[
  {
    // ...
    rules: {
      // ...
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
]
```

- Can just use a ready-made config from someone else's project in yours
  - [Airbnb JS style guide](https://github.com/airbnb/javascript) is popular
# [Structure of backend application, introduction to testing](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing)

Will continue working on backend notesapp from part 3

### Project structure

- Modify structure of project to adhere to Node.js best practices:

```
├── controllers
│   └── notes.js
├── dist
│   └── ...
├── models
│   └── note.js
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
├── app.js
├── index.js
├── package-lock.json
├── package.json
```

- Put all printing to console in its own module _utils/logger.js_:

```js
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }
```

- Module can be used for `error` or `info` 
- Extracting it is a good idea for writing logs to a file or an external service
  - We would only have to change the logging in one place 
- Handling of env vars extracted to _utils/config.js_ file:

```js
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT }
```

- Other parts of app access env vars by importing config module:

```js
const config = require('./utils/config')

logger.info(`Server running on port ${config.PORT}`)
```

- Route handlers moved into dedicated directory
  - They are called _controllers_, so that is what we will call the directory
- It will all be in a file called _notes.js_
- It is very similar to _index.js_ file with some key differences
  - At the top we create a [router](https://expressjs.com/en/api.html#router) object: 

```js
const notesRouter = require('express').Router()

//...

module.exports = notesRouter
```

 - The router is exported to be available to any consumer that wants to use it
 - Routes are defined for router object
   - Similar to before
 - Now a route's path looks like:

```js
notesRouter.delete('/:id', (request, response, next) => { })
```

- The router is a middleware
  - Used to define 'related routes' in a single place, which is typically placed in its own module
  - Any connection to our _api/notes_ is a similar route
  - The router is used if the URL of the request starts with _/api/notes_, as will be shown 
    - Hence, we only need to define the relative parts of the route (i.e. empty path / or param _/:id_)
- _app.js_ takes the router into use:

```js
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)
```

- _app.js_ defines the app and should be created in the root directory of the project:

```js
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
```

- File uses different middleware
  - One is _notesRouter_ that is attached to _/api/notes_ route 
- Custom middleware is moved to new _utils/middleware.js_ module:

```js
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
```

- _app.js_ will be in charge of connecting to db 
- _models/note.js_ will only define Mongoose schema for notes:

```js
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
```

- That model is then imported into _notes.js_, which is in charge of all the routing
- _index.js_ is used for starting the file and gets simplified:

```js
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
```

- _index.js_ file imports actual app (it is an express app) from _app.js_ and starts the app
  - `info` function of logger module used to print to console if app is working
- Now, Express app and code taking care of web server are separate and follow [best practices](https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7)
- "One of the advantages of this method is that the application can now be tested at the level of HTTP API calls without actually making calls via HTTP over the network, this makes the execution of tests faster."
- For smaller apps the structure does not matter much
  - For larger ones it is good to organize the modules
  - There is no strict structure, these are just good practices

### Note on exports

- Two types of exports in this app
  - One is in _logger.js_:

```js
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }
```

- An object with two fields is exported 
  - When importing, you can use this in two ways:
    1. Refer to the functions using the dot param 

```js
const logger = require('./utils/logger')

logger.info('message')
logger.error('error message')
```
   2. Destructure the function into their own vars:

```js
const { info, error } = require('./utils/logger')

info('message')
error('error message')
```

- The second way of exporting is favorable when you only use a small portion of the exported functions

### Testing Node apps

- Will do some unit testing
  - Create file *utils/for_testing.js* and write functions for test writing practice:

```js
const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

module.exports = {
  reverse,
  average,
}
```

- There are many _test runners_ (libraries)
  - We will use Node's built in library node:test
- Npm script `test` for test execution:

```js
"test": "node --test",
```

- Create _tests_ directory with file _reverse.test.js_:

```js
const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
  const result = reverse('react')

  assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
})
```

- `test` and library assert used to check result of functions we are testing
- `const reverse = require('../utils/for_testing').reverse` imports function to test and assigns to var `reverse`
- Test cases defined with `test` func
  - First argument is description as string
  - Second argument is _function_ that defines functionality for test case
    - The functionality for the test cases executes the code to be tested first (i.e. generate a string for the reverse of 'react')
    - Then the result is verified with the method `strictEqual` of the assert library
- Follow convention to end test file names with `.test.js` since _node:test_ testing library auto executes test files named this way
- If the test passes then it is very obvious, if the test fails then it displays the actual output and the expected output
- Create _tests/average.test.js_ for testing average function:

```js
const { test, describe } = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average

describe('average', () => {
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1)
  })

  test('of many is calculated right', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
  })

  test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0)
  })
})
```

- Average does not work on empty array
  - Fix:

```js
const average = array => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}
```

- A describe block was used around the tests 
  - This block was given the name `average`:

```js
describe('average', () => {
  // tests
})
```

- These blocks can be used for grouping tests into collections:

![alt text](images/test-groups.png)

- Compared to the tests for reverse, these are very compact
  - We don't assign the output of the function to a var to be tested:

```js
test('of empty array is zero', () => {
  assert.strictEqual(average([]), 0)
})
```
# [Testing the backend](https://fullstackopen.com/en/part4/testing_the_backend)

- Will test backend
  - Won't use unit testing since not complicated
    - Could unit test `toJSON` method
- Could implement tests by using mock db instead of real one
  - [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) can be used 
- Will use REST API to test due to simplicity of app
- Integration testing is testing multiple components of a system as a group
  - Use this

### Test environment

- When server running in Render, it is in production mode
- Convention to define execution mode of app with *NODE_ENV* env var
  - Env var only defined in _.env_ file, not production mode
- Common practice to define separate modes for development and testing
  - Change scripts in _package.json_:

```json
"scripts": {
  "start": "NODE_ENV=production node index.js",
  "dev": "NODE_ENV=development node --watch index.js",
  "test": "NODE_ENV=test node --test",
  "lint": "eslint ."
}
```

- Specified mode of execution for scripts
  - `npm run dev` has _development_ mode
  - `npm start` has _production_ mode
- This won't work on Windows, so install [cross-env](https://www.npmjs.com/package/cross-env) package:

```bash
npm install cross-env
```

- Use cross-env in npm scripts:

```json
"scripts": {
  "start": "cross-env NODE_ENV=production node index.js",
  "dev": "cross-env NODE_ENV=development node --watch index.js",
  "test": "cross-env NODE_ENV=test node --test",
  "lint": "eslint ."
}
```

- Can now modify how app runs in different modes
  - Can define app to use different testing db when running tests
- Testing backend with DB has many avenues
  1. We will create new MongoDB Atlas db 
     - Not optimal since if multiple developers are running tests, then they may override each other's data and break one another's tests
  2. Use local MongoDB
     - Local MongoDB instance on computer to avoid conflicts
     - Should use isolated test db for every test to avoid any form of conflict
       - Can use MongoDB In-memory Server or Docker
- Will be using MongoDB Atlas db
  - Make changes to `utils/config.js`:

```js
require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
```

- _.env_ file should have separate env var for db address of test and development db:

```
MONGODB_URI=mongodb+srv://fullstack:thepasswordishere@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0
PORT=3001

TEST_MONGODB_URI=mongodb+srv://fullstack:thepasswordishere@cluster0.a5qfl.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0
```

- Our `config` module slightly resembles [node-config](https://github.com/lorenwest/node-config) package
  - We will stick to ours since simple app
- Done changing app

### supertest

- Use [supertest](https://github.com/visionmedia/supertest) package for testing API
  - Install as development dependency:

```bash
npm install --save-dev supertest
```

- First test in *tests/note_api.test.js*:

```js
const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})
```

- Test imports Express app from _app.js_ and wraps in _supertest_ function into [superagent](https://github.com/visionmedia/superagent) object
  - Object assigned to `api` var
  - Tests can use it for making HTTP requests to backend
- Test makes HTTP GET request to _/api/notes_
  - Expects a status code 200 in return and _Content-type_ header of _application/json_ (data in desired format)
- Checking value of header uses weird syntax:

```js
.expect('Content-Type', /application\/json/)
```

- Desired value defined as regular expression (regex)
  - Regex starts with / and ends with /
  - _application.json_ also contains desired /, so it is preceded by \ to not be interpreted as regex termination char
- Desired value can be written as:

```js
.expect('Content-Type', 'application/json')
```

- Issue is that header could have value of _application/json; charset=utf-8_ 
  - Regex circumvents this issue but a string won't
- Will cover `async`, `await`, and `after` later
- Once all tests completed, close db connection used by Mongoose
  - Without this the program won't terminate
  - Can be done using `after` method:

```js
after(async () => {
  await mongoose.connection.close()
})
```

- Recall that the app instance created in _app.js_ does not listen to any ports
  - The instance is then imported into _index.js_, it then listens to a port
- The app instance imported into *note_api.test.js* does not listen to any ports
- This is due to supertest
  - It takes care that the app being tested is started at the port used internally
    - Thus, we do not need to manually run another instance of the server separately before testing
  - Supertest also provides additional functionality such as `expect()`
- Add notes using `mongo.js` 
- More tests:

```js
const assert = require('node:assert')
// ...

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, 2)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert.strictEqual(contents.includes('HTML is easy'), true)
})

// ...
```

- Both tests store response of request in `response` var
  - Instead of using methods of `supertest` for verifying header and content-type, we use assert and strict equal to inspect response data stored in _response.body_ property
- Can simplify second test by using only [assert](https://nodejs.org/docs/latest/api/assert.html#assertokvalue-message):

```js
test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})
```

- using async/await syntax allows us to avoid using callback functions and assign variables to data returned by promises:

```js
const response = await api.get('/api/notes')

// execution gets here only after the HTTP request is complete
// the result of HTTP request is saved in variable response
assert.strictEqual(response.body.length, 2)
```

- Middleware that outputs info on HTTP requests should not execute in test mode:

```js
const info = (...params) => {

  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
}

const error = (...params) => {

  if (process.env.NODE_ENV !== 'test') { 
    console.error(...params)
  }
}

module.exports = {
  info, error
}
```

### Initializing the database before tests

- Currently, success of tests depends on state of db
  - If db has two notes, then test passes
- Will instead reset db and generate needed test data before test
- Tests use `after` to close connection after tests done executing
  - Library node:test offers function to do things before every test, such as `beforeEach`:

```js
const assert = require('node:assert')

const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')

const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

// ...
```

- All notes in db deleted, then new notes stored in `initialNotes` added to db
  - Ensure db is in same state every run
- Modify test that checks number of notes:

```js
test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, initialNotes.length)})
```

### Running tests one by one

- `npm test` command runs all tests
  - Can run one or two tests at a time
- Can do this with `only` method
  - Defines which tests to run in code:

```js
test.only('all notes are returned', async () => {
    //
})
```

- When tests run with option `--test-only` as:

```bash
npm test -- --test-only
```
- Only the tests with `only` will be run
  - Forgetting to remove only is possible
- Can specify tests to run as args in `run test` commands
  - Following runs only tests found in *tests/note_api.test.js* file:

```bash
npm test -- tests/note_api.test.js
```

- --test-name-pattern option runs test with specific name:

```bash
npm test -- --test-name-pattern="a specific note is within the returned notes"
```

- Provided arg can refer to name of test or the describe block
  - Can also contain a portion of the name, and all tests that have that portion in them will be run:

```bash
npm run test -- --test-name-pattern="notes"
```

### async/await

- These use _asynchronous functions that return a promise_ in a way that makes the code look synchronous
- Example of fetching notes from db using promises:

```js
Note.find({}).then(notes => {
  console.log('operation returned the following notes', notes)
})
```

- `Note.find()` returns a promise that can be accessed in the callback function of the `then` method
  - If we want to use several asynchronous function calls in sequence then it becomes [callback hell](http://callbackhell.com/)
- Fixed somewhat by chaining promises:

```js
Note.find({})
  .then(notes => {
    return notes[0].deleteOne()
  })
  .then(response => {
    console.log('the first note is removed')
    // more code here
  })
```

- This can be improved on using `async`/`await`
- Can fetch all notes using `await`:

```js
const notes = await Note.find({})

console.log('operation returned the following notes', notes)
```

- Code looks like synchronous code
- Execution pauses at the first line and waits for the related promise to be _fulfilled_ then goes to the next line
  - When execution continues, result of operation that returns promise is assigned to `notes` variable
- Note deletion example with `await`:

```js
const notes = await Note.find({})
const response = await notes[0].deleteOne()

console.log('the first note is removed')
```

- This code is much simpler
- Few things to note
  - `await` operator can only be used with asynchronous operations and they must return a promise
  - `await` can only be used inside of an `async` function
    - So for previous examples to work, they have to use async functions:

```js
const main = async () => {
  const notes = await Note.find({})
  console.log('operation returned the following notes', notes)

  const response = await notes[0].deleteOne()
  console.log('the first note is removed')
}

main()
```

- Code declared to `main` function will be `async` 

### async/await in the backend

- Change backend to use `async` and `await`
  - Everything is done in functions already, so just change router handler functions into `async` functions
- Routing to fetch notes:

```js
notesRouter.get('/', async (request, response) => { 
  const notes = await Note.find({})
  response.json(notes)
})
```

### More tests and refactoring the backend

- Code got changed, so possibility of regression (existing functionality could break)
- Will refactor other routes and write tests for them
- Write test that adds new note and verifies that the number of notes returned by API increases and that the new note is in the list:

```js
test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  assert.strictEqual(response.body.length, initialNotes.length + 1)

  assert(contents.includes('async/await simplifies making async calls'))
})
```

- Test fails since accidentally returned status code 200 OK when new note created
  - Change to 201 CREATED in the router's route for posting a note:

```js
note.save()
  .then(savedNote => {
    response.status(201).json(savedNote)
  })
  .catch(error => next(error))
```

- Create test for checking that a note without content is not added:

```js
test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, initialNotes.length)
})
```

- Both tests check state stored in db after saving by fetching all notes: `const response = await api.get('/api/notes')`
  - Good to extract these steps into helper function
  - Add into new file *tests/test_helper.js* in same directory as test file:

```js
const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb
}
```

- `notesInDb` used for checking notes stored in db
- `nonExistingId` creates and returns a db object ID that does not belong to any note object in the db
- Import and use the helper module now:

```js
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

after(async () => {
  await mongoose.connection.close()
})
```

- The tests and promises work
- Need to handle errors

### Error handling and async/await

- If there is an error, then we need a way to deal with it
- Use `try` and `catch`:

```js
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})
```

- Catch block calls `next` function to pass execution to error handling middleware 
- Rewrite fetching and removing individual note:

```js
test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})
```
```js
test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  const contents = notesAtEnd.map(n => n.content)
  assert(!contents.includes(noteToDelete.content))

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})
```

- Similar structure to tests
  - Note fetched from db
  - Then test does operation 
  - Finally test verifies outcome
- `deepStrictEqual` is used instead of `strictEqual` 
  - `strictEqual` checks if the objects are the same using method `Object.is`, whereas `deepStrictEqual` compares object's contents
- Refactor tested routes to use `async`/`await`:

```js
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})
```
```js
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})
```

### Eliminating the try-catch

- `async`/`await` reduces clutter, but we have to use try-catch for errors in the same way in our route handlers:

```js
try {
  // do the async operations here
} catch (exception) {
  next(exception)
}
```

- Can use [express-async-errors](https://github.com/davidbanham/express-async-errors)
- Install:

```bash
npm install express-async-errors
```

- Import library in _app.js_ before your routes
- Route for deleting a note can become:

```js
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
```

- Do not need to call `next(exception)`
  - Library automatically calls error handling middleware when error occurs in _async_ route
- Other routes become:

```js
notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
```
```js
notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})
```

### Optimizing the beforeEach function

- Let's optimize the `beforeEach` function:

```js
beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})
```

- There is a better way to save multiple objects to a db:

```js
beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared')

  helper.initialNotes.forEach(async (note) => {
    let noteObject = new Note(note)
    await noteObject.save()
    console.log('saved')
  })
  console.log('done')
})
```

- This does not work since the first test begins before the db is initialized
  - Problem is that each iteration of `forEach` generates its own async operation, but the `beforeEach` function does not wait for their completion
  - So the await commands in the `forEach` are not a part of the `beforeEach` since they are separate functions
  - Also, `forEach` expects a synchronous function
- Solve using `Promise.all`:

```js
beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})
```

- `noteObjects` var assigned to array of Mongoose objects created by `map` method and `Note` constructor
- Next line creates array of promises by calling `save()` method on each note object in `noteObjects`
- `Promise.all()` transforms an array of promises into a single promise that will be fulfilled when every promise in the array is fulfilled
  - `await Promise.all(promiseArray)` waits until every promise for saving a note is finished
    - Returned values can still be accessed using `const results = await Promise.all(promiseArray)`, which will return an array
  - This also executes the promises in parallel
- For promises in particular order, use for...of block:

```js
beforeEach(async () => {
  await Note.deleteMany({})

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }
})
```

- Simpler way using Mongoose method `insertMany`:

```js
beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})
```

### Refactoring tests

- GET and DELETE requests on invalid IDs are not tested yet
- Readability of tests can be improved by grouping tests into _describe_ blocks
- File after improvements:

```js
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
  })

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api.get(`/api/notes/${validNonexistingId}`).expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.get(`/api/notes/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = { important: true }

      await api.post('/api/notes').send(newNote).expect(400)

      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

      const notesAtEnd = await helper.notesInDb()

      const contents = notesAtEnd.map(n => n.content)
      assert(!contents.includes(noteToDelete.content))

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
```
# [User administration](https://fullstackopen.com/en/part4/user_administration)

- Want to add user authentication and authorization
  - User stored in db and every note linked to a user
    - One to many relationship
  - Only a user who made a note can delete it
- To make our life easy we will save users in their own collection called _users_
- Will use object IDs in mongo to reference documents in other collections
  - Like using foreign keys in relational db
- Mongo 3.2 has lookup aggregation queries, which we will use
- Will use multiple queries to join and do stuff

### Reference across collections

- We can do a reference-based approach similar to relational dbs
- Assume _users_ collection has 2 users:

```js
[
  {
    username: 'mluukkai',
    _id: 123456,
  },
  {
    username: 'hellas',
    _id: 141414,
  },
]
```

- _notes_ collection has three notes that all have _user_ field that references a user in the _users_ collection:

```js
[
  {
    content: 'HTML is easy',
    important: false,
    _id: 221212,
    user: 123456,
  },
  {
    content: 'The most important operations of HTTP protocol are GET and POST',
    important: true,
    _id: 221255,
    user: 123456,
  },
  {
    content: 'A proper dinosaur codes with Java',
    important: false,
    _id: 221244,
    user: 141414,
  },
]
```

- In document db, foreign key can be stored in _notes_ collection or _users_ collection or both:

```js
[
  {
    username: 'mluukkai',
    _id: 123456,
    notes: [221212, 221255],
  },
  {
    username: 'hellas',
    _id: 141414,
    notes: [221244],
  },
]
```

- _note_ ids stored in array
- Since document db, can also store all notes in array in _users_ collection
- More freedom in document db means that programmer makes lots of important decisions about storage before knowing what functionality is needed 
- Can make life easier or harder

### Mongoose schema for users

- We will store the ids of notes created by user in the user document
- Create model for representing a user in _models/user.js_ file:

```js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

- IDs of notes stored within user document as array of Mongo ids:

```js
{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Note'
}
```

- Field type is _ObjectId_, meaning it refers to another document
  - _ref_ field specifies name of model being referenced
  - Mongo does not inherently know that this is a field that references notes, the syntax is related to and defined by Mongoose
- Expand note schema in _models/notes.js_ so that note contains info about user who created it:

```js
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
```

- References stored in both users documents and notes documents

### Creating users

- Implement route for creating users
  - Users have unique _username_, a _name_, and _passwordHash_
    - _passwordHash_ is output of one-way hash function applied to user's password
    - This is better than storing unencrypted plain text passwords in db
- Install bcrypt for making password hashes:

```bash
npm install bcrypt
```

- User created in compliance with RESTful conventions
  - Done by making HTTP POST request to _users_ path
- Define separate _router_ for dealing with users in new _controller/users.js_ file
  - Take router into use in _app.js_ file to handle requests made to _/api/users/_ url:

```js
// ...
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
// ...
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
// ...
```

- _controller/users.js_ which defines the router:

```js
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
```

- Password's hash is stored in the db
- Code has no error handling or input validation for username and password
- Can test this new functionality manually, but easier with automated testing
- Initial tests:

```js
const bcrypt = require('bcrypt')
const User = require('../models/user')

//...

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})
```

- Tests use _usersInDb()_ helper function created in *tests/test_helper.js* file:

```js
const User = require('../models/user')

// ...

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
}
```

- _beforeEach_ block adds user with the username _root_ to db
  - Can check that users with the same username are not created:

```js
describe('when there is initially one user in db', () => {
  // ...

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})
```

- Test won't pass since we have not ensured uniqueness of username yet
- We are practicing TDD (test-driven-development)
  - Test written before functionality
- Mongoose validation does not give direct way to check uniqueness of field value
  - Can achieve uniqueness by defining uniqueness index for field:

```js
username: {    
  type: String,    
  required: true,    
  unique: true // this ensures the uniqueness of username  
},
```

- Caveat: if there are documents in db that violate uniqueness condition, then no index will be created
- Mongoose validations do not check index violations
  - They return `MongoServerError` 
  - Need to extend error handler for that case:

```js
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }

  next(error)
}
```

- Now test will pass
- Can add further validations to user creation if you want
- Add implementation of router handler that returns all users in db:

```js
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})
```

- Use the REST Client to add a new user

### Creating a new note

- Code for creating new note must be updated so that note is assigned to user who created it
- Will update _controller/notes.js_ so that info of user who created note is sent in _userId_ field of request body:

```js
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or invalid' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  
  response.status(201).json(savedNote)
})
```

- Db first queried for user using the _userId_
  - If user not found, then error returned
  - Otherwise new note created with _userId_
- Note saved to db
  - _noteId_ concatenated to _user.notes_ 
  - Updated user saved to db
- We can add a new note using the REST Client:

```rest
POST http://localhost:3001/api/notes/
Content-Type: application/json

{
    "content": "New note test with userId",
    "important": true,
    "userId": "687692f97ec849569d8e814a"
}
```

- The new note should look like this:

![alt text](images/new-note.png)

- The user looks like this:

![alt text](images/new-user.png)

- The tests we had created no longer work
- We will fix the frontend note creation functionality in part 5 of the course

### Populate

- Want API to work such that when HTTP GET request made to _/api/users_ route, user object contains contents of user's notes and not just their id
  - Can be done in relational db with _join query_
- In Mongoose, join is done with `populate` method
  - Update route for getting all users in _controller/users.js_:

```js
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes')

  response.json(users)
})
```

- `populate()` is chained after a query like `find()` to automatically replace referenced document IDs with the actual documents
  - The argument to `populate()` specifies which field (e.g., notes) contains the references (_ObjectIds_)
- Mongoose first queries the initial collection (e.g., users) to get the documents
  - Then looks at the _ref_ defined in the schema (e.g., ref: 'Note') to know which collection to query next
  - It uses the stored _ObjectIds_ to fetch the referenced documents from the target collection (e.g., notes)
- Results in an array of full documents in the populated field:

![alt text](images/notes-in-users.png)

- Can use `populate` method for choosing fields we want to include from the document
- The _id_ field is returned automatically, but we are also interested in only the _content_ and _important_ fields
- The selection is done with the Mongo syntax:

```js
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, important: 1 })

  response.json(users)
})
```

- Now the output will look as follows:

![alt text](images/new-notes-in-users.png)

- When retrieving a note, we also want some user info so change _controllers/notes.js_ file:

```js
notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
})
```

- It looks as follows:

![alt text](images/new-user-in-notes.png)

> It's important to understand that the database does not know that the ids stored in the user field of the notes collection reference documents in the user collection.
> The functionality of the populate method of Mongoose is based on the fact that we have defined "types" to the references in the Mongoose schema with the ref option:

```js
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
```
# [Token authentication](https://fullstackopen.com/en/part4/token_authentication)


- Users can log into application and when they create a new not, their info will be attatched to the note
- Implement [token-based authentication](https://www.digitalocean.com/community/tutorials/the-ins-and-outs-of-token-based-authentication#how-token-based-works)
  - Diagram for app:

![alt text](images/sequence.png)

- User starts by logging in using a login form implemented with React
  - We will add the login form to the frontend in part 5
- This causes the React code to send the username and the password to the server address _/api/login_ as an HTTP POST request.
- If the username and the password are correct, the server generates a token that somehow identifies the logged-in user.
  - The token is signed digitally, making it impossible to falsify (with cryptographic means)
- The backend responds with a status code indicating the operation was successful and returns the token with the response.
- The browser saves the token, for example to the state of a React application.
- When the user creates a new note (or does some other operation requiring identification), the React code sends the token to the server with the request.
- The server uses the token to identify the user

- Will implement logging in
  - Install jsonwebtokeb library for generating tokens:

```bash
npm install jsonwebtoken
```

- _controllers/login.js_ has login functionality:

```js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
```

- Code starts by searching for user with the username in db
- Then it checks the _password_, which is only valid if the user was found
  - Hashes are compared using `bcrypt.compare()`
- If user is not found or password incorrect, then request responded with 201 unauthorized
  - Reason in response body
- If password correct, token created with `jwt.sign()` method
  - Token has username and user id in digitally signed form
  - Signed using env var _SECRET_ as the _secret_ 
  - Makes it so that only people who know the secret can generate valid token (imagine its like putting a nonce infront of a string in a hash)
- Successful request responded with status code _200 OK_
  - Token and user name of user sent back in response body
- Add login router to the app through _app.js_:

```js
const loginRouter = require('./controllers/login')

//...

app.use('/api/login', loginRouter)
```

- Reminder to add env var _SECRET_ to _.env_ file
- Login using VS Code TEST-client:

```rest
POST http://localhost:3001/api/login
Content-Type: application/json

{
    "username": "adi",
    "password": "fullstack"
}
```

![alt text](images/response.png)

### Limiting creating new notes to logged-in users

- Make it so that new note can only be created if post request has valid token
  - Only then is new note saved
- Many ways to send token from browser to server, will use authorization header, which also tells [authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Authentication#authentication_schemes) in use
  - Using _Bearer_ scheme 
- Example of Authorization header with a token:
  - ```Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW```
- Creating new notes in _controller/notes.js_ will change: 

```js
const jwt = require('jsonwebtoken')

// ...
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})
```

- `getTrokenFrom` is a hlper function that isolates the token from the _authorization_ header
  - Token validity checked with `jwt.verify`
    - This also decodes the token or returns the Object the token was based on
    - Recall that the token was based on an object that had the user's id and username
- If token is invalid or missing, exception _JsonWebTokenError_ is raised
  - Extend error handling middleware to handle this error:

```js
else if (error.name ===  'JsonWebTokenError') {    
  return response.status(401).json({ error: 'token invalid' })  
}
```

- Token has username and id, so server knows who made the request
  - If the token does not contain an id, then an error status code [401 unauthorized](https://www.rfc-editor.org/rfc/rfc9110.html#name-401-unauthorized) is returned with a message
- When identity of maker of request is resolved, execution continues as before
- Can create new note using REST Client:

![alt text](images/new-note-with-auth.png)

 - If app has multiple interfaces that require identification, then JWT validation should be separate into own middleware
 - Can also use library like [express-jwt](https://www.npmjs.com/package/express-jwt)

### Problems of Token-based authentication

- Token has one issue
  - Should API blindly trust token holder? What if token should be revoked?
- To solve this we will choose easy solution of limiting validity period of a token
  - Do this by changing the definition of a token when declared, in _controller/login.js_:

```js
const token = jwt.sign(
  userForToken, 
  process.env.SECRET,
  { expiresIn: 60*60 }
)
```

- When token expires, client has to get a new one
  - Done by forcing user to re-login
- Need error handling incase token expires by editting error handler middleware:

```js
else if (error.name === 'TokenExpiredError') {
  return response.status(401).json({
    error: 'token expired'
  })
}
```

- Short token expiration increases security but worsens UX  
  - Users need to log in more frequently
- Alternative: use server-side sessions (store token info in backend DB)  
  - Backend checks token validity for every API request  
  - Allows revoking access at any time
- Downside: slower and more complex  
  - DB check needed per request
- Solution: store sessions in Redis  
  - Redis is a key-value store, extremely fast compared to full DBs like MongoDB
- Server-side tokens:  
  - Typically random strings, contain no user info  
  - Identity info fetched from DB on each request
- Token transport:  
  - Server-side sessions often use cookies  
  - JWT-based auth usually uses Authorization header

### End notes

- The tests dont work anymore, can fix em if u want
- Login implemented in next part
# [Login in frontend](https://fullstackopen.com/en/part5/login_in_frontend)

- Cant add new notes through the front end since backend expects a token verifying the users identity
  - Will implement user management functionality to frontend
- Will assume that new users are not added through the frontend

### Handling login

- Code in _App_ component:

```jsx
const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  useEffect(() => {
    noteService
      .getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // ...

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

      // ...
    </div>
  )
}

export default App
```

- Reminder to connect backend to frontend by running `npm run dev` for both (connected through prox in _vite.config.js_)
- Login form is handled the same way as before
  - App state has field for _username_ and _password_ 
  - They have event handler which synchronize changes in field to state (as shown in _part2 b_)
  - Event handlers are the same 
- Method `handleLogin` is yet to be implemented
- Logging in is done through HTTP POST request to server address _api/login_ 
  - Put this code in own module _services/login.js_
- Will use _async/await_ syntax for HTTP request:

```js
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
```

- Method for logging in handled as follows:

```jsx
import loginService from './services/login'

const App = () => {
  // ...
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  // ...
}
```

- Successful login clears the form fields
  - Server response is also saved to _user_ field of app's state (it includes a _token_ and user details)
- If login fails, then warning appears
- Modify login field to only show if user is not logged in (to show user if logged in or not)
  - When `user === null`
- Form for adding new notes shown only if _user is logged in
  - So when user state contains users details
- Add two helper functions to _App_ component for forms:

```jsx
const App = () => {
  // ...

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    // ...
  )
}
```

- Conditionally render them:

```jsx
const App = () => {
  // ...

  const loginForm = () => (
    // ...
  )

  const noteForm = () => (
    // ...
  )

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null && loginForm()}
      {user !== null && noteForm()}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
          <Note
            key={i}
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}
```

- This employs a common [React trick](https://react.dev/learn/conditional-rendering#logical-and-operator-) to render things conditionally
  - In JSX, `{cond ? <A /> : <B />}` means “if `cond`, render `<A />`, otherwise `<B />`”
  - In JSX, `{cond && <A />}` means “if `cond`, render `<A />`, otherwise nothing”
    - This works since if the first statement (`cond`) is false the whole statement becomes false and the second statement is not rendered
- Can be simplified further:

```jsx
{user === null 
    ? loginForm() 
    : noteForm()
}
```

- Make another modification, if user is logged in then it shows their name on the screen:

```jsx
{user === null 
  ? loginForm() 
  : <div> 
    <p>{user.name} logged-in</p>
    {noteForm()}
  </div>
}
```

- This aint perfect but it works for now
- Will also refactor _App_ component into individual components 

### Creating new notes

- `user` state contains token returned on successful login

```jsx
setUser(user)
```

- Add token of logged-in user to Authorization header of HTTP request now
- _noteServices_ module changes:

```js
import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
```

- `token` variable which can be manipuated by `setToken` method, exported with module
- `create` method sets token to the Authorization header 
  - Header given to axios as third param of _post_ method
- Event handler for login must call method `noteService.setToken(user.token)` when successful login
- Adding a new note works now

### Saving the token to the browser's local storage

- Problem: if poage refreshed, user login is forgotten
  - Will solve using browser's db
- Local storage is a key-value db in the browser
- _value_ with _key_ stored in db using `setItem` method:

```js
window.localStorage.setItem('name', 'juha tauriainen')
```

- Normal key value pair stuff
- value of key found using method `getItem`:

```jsx
window.localstorage.getItem('name')
```

- `removeItem` removes a kay
- Values in local storage remains after reloading (page re-rendered)
  - Storage is [origin-specific](https://developer.mozilla.org/en-US/docs/Glossary/Origin) so each we app has its own storage
- Will extend app so details of logged-in user saved to local storage
  - Values saved as DOMstrings, so cant save JS objects as is
  - Must parse object into JSON with `JSON.stringify()`
  - Then when object read from storage, you must convert it back to JS object yusing `JSON.parse()`
- Changes to login method:

```jsx
const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedNoteappUser', JSON.stringify(user)
    ) 
    noteService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    // ...
  }
}
```

- Local storage data can be seen by typing `window.localStorage` in the console

![alt text](images/local-storage.png)

- You can also see the local storage in the _Storage_ tab
- Still need to make it so if user details are in local storage, then details are saved to state of app and to _noteService_
  - Right way to do this is to use an effect hook:

```jsx
useEffect(() => {
	const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
	if (loggedUserJSON) {
		const user = JSON.parse(loggedUserJSON);
		setUser(user);
		noteService.setToken(user.token);
	}
}, []);
```

- Empty array as param of effect ensure effect only runs when component rendered for firt time
- Now user logged in forever
  - Need to add _logout_ functionality, this is exercise for user
    - We will just use the console and the following command: `window.localStorage.removeItem('loggedNoteappUser')` or empty the whole storage: `window.localStorage.clear()` 
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
# [Testing React apps](https://fullstackopen.com/en/part5/testing_react_apps)
# [End to end testing: Playwright](https://fullstackopen.com/en/part5/end_to_end_testing_playwright)
# [End to end testing: Cypress](https://fullstackopen.com/en/part5/end_to_end_testing_cypress)
