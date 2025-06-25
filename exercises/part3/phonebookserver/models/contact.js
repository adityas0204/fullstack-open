const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log(`Connecting to URL: ${url}`)
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(`Failed to connect to MongoDB: ${error.message}`))

const numberValidator = (val) => {
  const strings = val.split('-')

  if (strings.length !== 2) {
    return false
  }

  if (val.replace('-', '') < 8) {
    return false
  }

  if (
    /^\d+$/.test(strings[0]) &&
        strings[0].length >= 2 &&
        strings[0].length <= 3 &&
        /^\d+$/.test(strings[1]) &&
        strings[1].length >= 1
  ) {
    return true
  }

  return false
}

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: numberValidator,
      message: props => `Phone number ${props.value} is of incorrect form: have length of 8 or more; be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers`
    }
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)

