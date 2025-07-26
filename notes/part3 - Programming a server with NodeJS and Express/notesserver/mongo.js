const mongoose = require('mongoose')

const url = 'mongodb+srv://fullstack:fullstack@cluster0.bvak88w.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'BRUH',
  important: true,
})

note.save().then((result) => {
  console.log('note saved!')
  mongoose.connection.close()
})

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })