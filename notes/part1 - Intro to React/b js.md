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

```js
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

```js
const t = [1, -1, 3]

const t2 = t.concat(5)  // creates new array

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed
```

- Map creates a new array after applying the function given as a param to the old array:

```js
const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed
```
```js
const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed
```

- Array of numbers is converted into array of HTML strings 
    - Map used frequently in React

- Destructuring assignment used to assign elements of array to variables:

```js
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1 2 is printed
console.log(rest)          // [3, 4, 5] is printed
```

### Objects (Dictionary)

- Common way to define objects by using object literals 
  - List properties within braces:

```js
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

```js
console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age'
console.log(object1[fieldName])    // 35 is printed
```

- Properties can be added or manipulated in a similar fashion

### Functions

- Arrow method: 

```js
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}
```

- For single param you can remove brackets:

```js
const square = p => {
  console.log(p)
  return p * p
}
```

- Can be further reduced to the following if we remove console call:
  - The single expression is also returned

```js
const square = p => p * p
```

```js
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]
```

### Object methods and "this" 

This section is not relevant to the course due to the use of React Hooks, but is good to know.

- Objects have a _this_ keyword which refers to itself: 

```js
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

```js
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

```js
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

```js
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

