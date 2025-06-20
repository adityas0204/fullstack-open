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
  - Be systemic and elimninate all possibnilities one by one
    - Use the console logging, Postman, and debuggers 

### MongoDB

- Will use MongoDB to save notes indefinately
- Wil use MongoDB Atlas
  - This is a MongoDB service provider that gives cloud storage 
  - Create a free account and create a new, free cluster after selecting the cloud provider and data center

![alt text](images/new-cluster.png)

- You will be greeted with a popup to create user credentials for the db
  - These will be used by your app to connect to the db
  - This can also be done in the _Quickstart_ menu

![alt text](images/new-user.png)

- In _Network Access_, add a new ip address, and allow connection from anywhere for simplicity
- Now, connect to the db
  - Need bd connection string, found by selecting _Connect_ then _Drivers_ in the _Clusters_ section
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

- Create pratice app by making file _mongo.js_ in root of notes backend app
- Use the URI generated from MongoDB Atlas
- Code should also be passed password as command line arg:

```js
const password = process.argv[2]
```

- Run code with command _node mongo.js yourPassword_, which will cause Mongo to add a new document to the database
  - The password to be inputted is the database users password
- The inputted document can be viewed under _Browse Collections_ in _Clusters_

![alt text](images/collection.png)

- Drop default db _test_, and change name of db in connection string to _noteApp_ by modifiying URI:

```js
const url = `mongodb+srv://fullstack:${password}@cluster0.bvak88w.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
```

- After running command once more:

![alt text](images/new-db.png)

- MongoDB Atlas automatically creates a db when an app tries to connect a nonexistent db

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
  - Mongoose convention to name collections as plural, whereas scheme should refer to them in singular
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

- `find` takes seraching conditions as params
  - Similar to what is typically done in MongoDB:

```js
Note.find({ important: true }).then(result => {
  // ...
})
```