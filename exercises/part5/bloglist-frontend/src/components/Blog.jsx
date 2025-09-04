import { useState } from "react"

const Blog = ({ blog, handleLikes, handleDelete, loggedInUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = event => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleClick}>{!showDetails ? 'view' : 'hide'}</button>
      </div>
      <div>
        {showDetails && 
          <div>
            {blog.url} <br />
            {blog.likes} <button onClick={handleLikes}>like</button> <br />
            {blog.user.name} <br />
            {blog.user.username === loggedInUser && <button onClick={handleDelete}>remove</button>}
          </div>
        }
      </div>
    </div>  
  )
}

export default Blog