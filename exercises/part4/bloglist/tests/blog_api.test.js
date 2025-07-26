const { test, after, beforeEach, describe, before } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb, usersInDb } = require('./test_helper')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

let token

beforeEach(async () => {
	await User.deleteMany({})
	await Blog.deleteMany({})

	const passwordHash = await bcrypt.hash('fullstack', 10)
	const user = await new User({
		username: 'Root',
		name: 'Root',
		passwordHash,
	}).save()

	const blogsWithUser = initialBlogs.map(blog => ({ ...blog, user: user._id }))
	const savedBlogs = await Blog.insertMany(blogsWithUser)

	user.blogs = savedBlogs.map(blog => blog._id)
	await user.save()

	token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)
})

describe('when there are initially notes', () => {
  test('unique identifier property named id', async () => {
    const response = await api.get('/api/blogs')
    const properties = Object.keys(response.body[0])

    assert(properties.includes('id'))
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(initialBlogs.length, response.body.length)
  })
})

describe('new blog created', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Just Right',
      author: 'Crazy',
      url: 'Crazy.ca',
      likes: 190
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

    const content = blogsAtEnd.map(blog => blog.title)
    assert(content.includes('Just Right'))
  })

  test('missing likes property defaulted to 0', async () => {
    const newBlog = {
      title: 'Just Right',
      author: 'Crazy',
      url: 'Crazy.ca'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

    const content = blogsAtEnd.map(blog => blog.likes)
    assert(content.includes(0))
  })

  test('status code 400 returned on missing title or url', async () => {
    const newBlog = {
      author: 'JoJo',
      likes: 9
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
  })

  test('status code 401 returned if token not provided', async() => {
    const newBlog = {
      title: 'this test pmo',
      author: 'JoJo',
      url: 'random.shit',
      likes: 9
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    
    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  test('correct blog removed and status code 204 recieved when id is valid', async () => {
  const initialBlogs = await blogsInDb()
  const blogToDelete = initialBlogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await blogsInDb()
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)

  const contents = blogsAtEnd.map(blog => blog.title)
  assert(!contents.includes(blogToDelete.title))
  })
})

describe('editting a note', () => {
  test('succeeds with data changed', async () => {
    const initialBlogs = await blogsInDb()
    const blogToEdit = initialBlogs[0]
    blogToEdit.author = 'Krutik'

    await api 
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(blogToEdit)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)

    const edittedBlog = blogsAtEnd.filter(blog =>  blog.id === blogToEdit.id)[0]
    assert.deepStrictEqual(edittedBlog, blogToEdit)
  })
})

describe('initially only one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('fullstack', 10)
    const newUser = new User({ username: "adi", name: "Aditya", passwordHash})

    await newUser.save()
  })

  test('duplicate user is invalid', async () => {
    const usersAtStart = await usersInDb()
    const duplicateUser = usersAtStart[0]

    const newUser = {
      username: duplicateUser.username,
      name: "Duplicate",
      password: "Duplicate"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)

    const names = usersAtEnd.map(user => user.name)
    assert(!names.includes(newUser.name))
    
    assert(result.body.error.includes('username to be unique'))
  })
})

after(async () => {
  await mongoose.connection.close()
})