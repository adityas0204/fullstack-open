import { useState } from 'react'

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const blogSubmit = event => { 
    event.preventDefault()
    handleNewBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <form onSubmit={blogSubmit}>
      <h2>create new</h2>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input 
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />  
      </div>
      <div>
        url:
        <input 
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm