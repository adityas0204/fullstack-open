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