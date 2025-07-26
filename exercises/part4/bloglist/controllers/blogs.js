const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  if (!body.author || !body.url) {
    response.status(400).end()
  }

  if (!request.user) {
    return response.status(401).json({ error: 'token missing'})
  }

  const user = await User.findById(request.user.id)
  if (!user) {
    return response.status(401).json({ error: 'user missing or invalid' })
  }

  const blog = new Blog(
  {
    title: body.title,
    author: body.author, 
    url: body.url,
    user: user._id,
    likes: body.likes ??  0
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.user.id)
  if (!user) {
    return response.status(401).json({ error: 'user missing or invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(400).json({ error: 'blog missing or invalid' })
  }

  if (user._id.toString() !== blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'only the creator of the blog can delete it' })
  }

  await Blog.findByIdAndDelete(blogToDelete.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    blog.title = body.title
    blog.author = body.author
    blog.url = body.url
    blog.likes = body.likes

    const returnedBlog = await blog.save()
    response.status(200).json(returnedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter