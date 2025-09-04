# [Testing React apps](https://fullstackopen.com/en/part5/testing_react_apps)

- Can use _Jest_
- Will use _Vitest_
- Install _Vitest_ and _jsdom_ library simulating web browser:

```bash
npm install --save-dev vitest jsdom
```

- Install _react-testing-library_ which will help render components for testing:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

 -Add script to _package.json_ file to run tests:

```json
{
  "scripts": {
    // ...
    "test": "vitest run"
  }
  // ...
}
```

- Create `testSetup.js` in project root:

```js
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})
```

- After each test, `cleanup` executed to reset jsdom, which simulates the browser
- Expand `vite.config.js`:

```js
export default defineConfig({
  // ...
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
  }
})
```

- `globals: true` makes it so we dont have to import keywords like `describe` into the tests
- Write first test for note rendering component:

```js
const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
```

- ClassName will let us access that element

### Rendering the component for tests

- Write tests in same directory as component
- Create _Note.test.jsx_ file
  - Verifies that component renders the contents of the note:

```jsx
import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})
```

- After initial config, test renders component with _render_ function from react-testing-library:

```jsx
render(<Note note={note} />)
```

- Normally React components rendered to DOM
  - Render method used above renders components them in way suitable for testing, and not to DOM
- Use _screen_ to access rendered component
  - _getByText_ method searchs for element that has the note's content
- Vitest's _expect_ command checks existence of element
  - Creates assertion for argument
  - _toBeDefined_ tests if element argument of expect exists
- Run test using `npm test`:

```bash
$ npm test

> rendering@0.0.0 test
> vitest run


 RUN  v3.2.4 C:/Users/adi4s/my_stuff/coding/fullstack/notes/part2 - Communicating with server/notes

 ✓ src/components/Note.test.jsx (1 test) 17ms
   ✓ renders content 16ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  18:22:03
   Duration  1.46s (transform 52ms, setup 444ms, collect 21ms, tests 17ms, environment 708ms, prepare 102ms)
```

### Test file location

- Two conventions for test file location
  1. In same directory as component
  2. In separate `/tests` directory
- Either is fine, will follow #1

### Searching for content in a component

- react-testing-library has many ways to check for content of component being tested
- Don't need `expect` at all
- The test will fail if `getByText` can not find an element 
  - It searches for element that has only the text provided as param
  - If there is extra text in the component, then it will fail
  - For non-exact matching:

```jsx
const element = screen.getByText(
  'Does not work anymore :(', { exact: false }
)
```

- Or use `findByText` method (like using getByText with exact: true):

```jsx
const element = await screen.findByText('Does not work anymore :(')
```

- Might use `queryByText`, which returns element but not an exception if not found
  - Use to ensure something is not rendered:

```jsx
test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})
```

- Can use `getByTestId` sometimes
  - Searches for elements by id field made for testing
- Can use [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) to find rendered elements
  - Use `querySelector` of object container, which is returned by `render`:

```jsx
import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const { container } = render(<Note note={note} />)

  const div = container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
```

- Better to use other methods for searching content within components
- User cant see CSS attributes and they can be changed without affecting site
- Search for elements based on properties visible to user
  - ie. `getByText` method

### Debugging tests

- Object `screen` method `debug` prints HTML of component to terminal:

```jsx
import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  screen.debug()

  // ...
})
```

- Can also use to print specific element:

```jsx
import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')

  screen.debug(element)

  expect(element).toBeDefined()
})
```

### Clicking buttons in tests

- Can also ensure that event handler is called when button associated with note is pressed
- _user-event_ library makes simulating user input easier:

```bash
npm install --save-dev @testing-library/user-event
```

- Edit test file:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

// ...

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  
  const mockHandler = vi.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
```

- Event handler is [mock](https://vitest.dev/api/mock) function defined with Vitest:

```jsx
const mockHandler = vi.fn()
```

- [Session](https://testing-library.com/docs/user-event/setup/) started to interacct with component:

```jsx
const user = userEvent.setup()
```

- Finds button by text and [clicks](https://testing-library.com/docs/user-event/convenience/#click) on it:

```jsx
const button = screen.getByText('make not important')
await user.click(button)
```

- `toHaveLength` used to ensure function clicked once:

```jsx
expect(mockHandler.mock.calls).toHaveLength(1)
```

- Calls to mock function saved in `mock.calls` array
- Mock functions and objects used to replace dependencies and test components
  - Can return hard coded responses or see how many times a button is clicked

### Tests for the Togglable component

- Tests for Togglable component:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div>togglable content</div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    screen.getByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const element = screen.getByText('togglable content')
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const element = screen.getByText('togglable content')
    expect(element).toBeVisible()
  })
```

- `beforeEach` renders Togglable before each test
- `screen.getByText` checks if component is in the DOM (it has been rendered)
- `toBeVisible` checks if its literally visible using many different methods
- First test checks if Togglable is rendered by looking for its child 
- Second test checks if child is not visible initially
- Third test checks if child becomes visible after pressing button
- Test to check if child is hidden when button pressed a second time:

```jsx
test('toggled content can be closed', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('show...')
  await user.click(button)

  const closeButton = screen.getByText('cancel')
  await user.click(closeButton)

  const element = screen.getByText('togglable content')
  expect(element).not.toBeVisible()
})
```

### Testing the forms

- Simulate text input with _userEvent_
- Make test for _NoteForm_ Component
  - Recall that _NoteForm_ works by calling function recieved as props `createNote` 
  - Test:

```jsx
import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
```

- Test access input field using [getByRole](https://testing-library.com/docs/queries/byrole)
- `type` method used to input text 
- First expect checks for one call to `createNote` 
- Second expect checks that event handler called with right params and correct content is created when the form is filled
- `console.log` works in tests as usual

### About finding the elements

- Assume form has two input fields:

```jsx
const NoteForm = ({ createNote }) => {
  // ...

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
        />
        <input
          value={...}
          onChange={...}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
```

- Can not use `getByRole` to get input field
  - Would cause an error due to multiple input fields
- Can instead use `GetAllByRole`:

```jsx
const inputs = screen.getAllByRole('textbox')

await user.type(inputs[0], 'testing a form...')
```

- `GetAllByRole` returns array
  - Sus since relies on order of inputs
- Can use a label (connecting label and input):

```jsx
<label>
  content
  <input
    value={newNote}
    onChange={event => setNewNote(event.target.value)}
  />
</label>
```

- Then can do `const input = screen.getByLabelText('content')` to get the input field in testing
- Input fields may also have placeholder text to hint user what kind of input
  - Add place holder to form:

```jsx
const NoteForm = ({ createNote }) => {
  // ...

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
          placeholder='write note content here'
        />
        <input
          value={...}
          onChange={...}
        />    
        <button type="submit">save</button>
      </form>
    </div>
  )
}
```

- Use `getByPlaceholderText` to get input field:

```jsx
test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createNote = vi.fn()

  render(<NoteForm createNote={createNote} />) 

  const input = screen.getByPlaceholderText('write note content here')
  const sendButton = screen.getByText('save')

  userEvent.type(input, 'testing a form...')
  userEvent.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
```

- Sometimes it can be difficult to find an element
  - So can use `querySelector` method alongside CSS selectors as shown previously

### Test coverage

- Install coverage:

```bash
npm install -D @vitest/coverage-v8
```

- Run command `npx vitest run --coverage` to see coverage
- Generates _coverage_ directory in folder
  - Right click _index.html_ and press _open with live server_ 
  - Explore page in browser
- Add folder to _.gitignore_

```bash
//...

coverage/
```

### Frontend integration tests

In the previous part of the course material, we wrote integration tests for the backend that tested its logic and connected the database through the API provided by the backend. When writing these tests, we made the conscious decision not to write unit tests, as the code for that backend is fairly simple, and it is likely that bugs in our application occur in more complicated scenarios than unit tests are well suited for.

So far all of our tests for the frontend have been unit tests that have validated the correct functioning of individual components. Unit testing is useful at times, but even a comprehensive suite of unit tests is not enough to validate that the application works as a whole.

We could also make integration tests for the frontend. Integration testing tests the collaboration of multiple components. It is considerably more difficult than unit testing, as we would have to for example mock data from the server. We chose to concentrate on making end-to-end tests to test the whole application. We will work on the end-to-end tests in the last chapter of this part.

### Snapshot testing

Vitest offers a completely different alternative to "traditional" testing called snapshot testing. The interesting feature of snapshot testing is that developers do not need to define any tests themselves, it is simple enough to adopt snapshot testing.

The fundamental principle is to compare the HTML code defined by the component after it has changed to the HTML code that existed before it was changed.

If the snapshot notices some change in the HTML defined by the component, then either it is new functionality or a "bug" caused by accident. Snapshot tests notify the developer if the HTML code of the component changes. The developer has to tell Vitest if the change was desired or undesired. If the change to the HTML code is unexpected, it strongly implies a bug, and the developer can become aware of these potential issues easily thanks to snapshot testing.


