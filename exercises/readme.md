# Exercises

Should be submitted when all exercises from part have been completed.

[Submission portal](https://studies.cs.helsinki.fi/stats/courses/fullstackopen/submissions).

To create a new app using [Vite](https://vite.dev/guide/), use the following cmd line prompt:

```
npm create vite@latest [ name of app ]
```

To create a quick [JSON Server](https://github.com/typicode/json-server?tab=readme-ov-file), first create a _db.json_ file in your project, then run this prompt to prevent separate installation:

```
npx json-server --port 3001 db.json
```

For communication between browser and server you can use [axios](https://github.com/axios/axios):

```
npm install axios
```

### Setting up a webserver using Node 

- Create a directory, navigate into it, and run the command

```bash
npm init
```

- _package.json_ will be created
  - In it, add two scripts:

```json
  "start": "node index.js",
  "dev": "node --watch index.js"
```

- Can be used by doing `npm start` or `npm run dev`
- Then, create a _.gitignore_ file and add _node_modules_ directory
- Then, install Express 4:

```bash
npm install express@4.21.2
```

- Create your _index.js_ file in the root directory
- Add the following code to it to create a server:

```js
const express = require('express')
const app = express()

const PORT = 3001
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})
```