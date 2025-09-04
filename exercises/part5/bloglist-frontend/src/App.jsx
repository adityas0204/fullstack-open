import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notication from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [notification, setNotification] = useState({ message: null, type: null })
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )  
  }, [])

  const handleLogin = async (userLoggingIn) => {
    try {
      const user = await loginService.login(userLoggingIn)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotification({ message: 'wrong username or password', type: 'error'})
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleNewBlog = async newBlog => {
    try {
      const blog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
      setNotification({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    } catch (exception) {
      setNotification({ message: exception.message, type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleLikes = async (event, id) => {
    event.preventDefault()

    try {
      const blogToUpdate = blogs.find(blog => blog.id === id)
      const updatedBlog = await blogService.updateLikes({ 
        title: blogToUpdate.title,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1,
        author: blogToUpdate.author,
        user: blogToUpdate.user.id
      }, blogToUpdate.id)
      setBlogs(blogs
          .map(blog => blog.id === id ? updatedBlog : blog)
          .sort((a, b) => b.likes - a.likes)
        )
    } catch (exception) {
      setNotification({ message: exception.message, type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleDelete = async (event, id, title, author) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id != id))
        setNotification({ message: `Removed blog ${title} by ${author}`, type: 'success' })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      } catch (exception) {
        setNotification({ message: exception.message, type: 'error' })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      }
    }
  }

  return (
    <div>
      <Notication {...notification} />
      
      {user === null
        ? <LoginForm handleLogin={handleLogin} />
        : <div>
            <h2>blogs</h2>

            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>

            <Togglable buttonLabel={'new blog'} ref={blogFormRef} >
              <BlogForm handleNewBlog={handleNewBlog} />
            </Togglable>
            
            {blogs.map(blog => (
              <Blog 
                key={blog.id} 
                blog={blog} 
                handleLikes={() => handleLikes(blog.id)} 
                handleDelete={() => handleDelete(blog.id, blog.title, blog.author)} 
                loggedInUser={user.username} 
              />
              )
            )}
          </div>
      }
    </div>
  )
}

export default App