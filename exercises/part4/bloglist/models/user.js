const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }],
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  passwordHash: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)