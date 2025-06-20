const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('please provide a password as an argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://phonebook:${password}@cluster0.bydncdp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)