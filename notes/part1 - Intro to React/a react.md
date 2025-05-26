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

```js
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

```js
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

```js
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

