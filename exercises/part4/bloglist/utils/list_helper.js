const { countBy, maxBy, groupBy } = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  mostLikedBlog = 
    blogs.length > 0 ? blogs[0] : {}

  for (let i=1; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikedBlog.likes) {
      mostLikedBlog = blogs[i]
    }
  }

  return mostLikedBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const authors = countBy(blogs, 'author')

  const topAuthor = maxBy(Object.entries(authors), ([, count]) => count)
  
  return { author: topAuthor[0], blogs: topAuthor[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const authors = groupBy(blogs, 'author')

  const likeAuthors = Object.entries(authors).map(([author, posts]) => (
    {
      author: author,
      likes: posts.reduce((total, post) => total + post.likes, 0)
    }
  ))

  const topAuthor = maxBy(likeAuthors, 'likes')

  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}