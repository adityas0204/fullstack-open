import { useState } from "react"

const Blog = (props) => {
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
        {props.blog.title} {props.blog.author}
        <button onClick={handleClick}>{!showDetails ? 'view' : 'hide'}</button>
      </div>
      <div>
        {showDetails && props.children}
      </div>
    </div>  
  )
}

export default Blog