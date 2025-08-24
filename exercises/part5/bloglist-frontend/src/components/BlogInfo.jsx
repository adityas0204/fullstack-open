const BlogInfo = ({ url, likes, username, user, loggedInUser, handleLikes, handleDelete }) => {  
  return (
    <div>
      {url} <br />
      {likes} <button onClick={handleLikes}>like</button> <br />
      {username} <br />
      {user === loggedInUser && <button onClick={handleDelete}>remove</button>}
    </div>
  )
}

export default BlogInfo