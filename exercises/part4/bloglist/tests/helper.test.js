const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

  const listWithOneBlog = [
    {
      _id: 'asdfsd9r0934asd',
      title: 'not much',
      author: 'me',
      url: 'bruh',
      likes: 5,
      __v: 0
    }
  ]

  const emptyList = []

  const listWithMultipleBlogs = [
    {
      _id: 'gwe45234dfg',
      title: 'not much',
      author: 'me',
      url: 'bruh',
      likes: 1,
      __v: 0
    },
    {
      _id: 'asdfsd9r0934asd',
      title: 'not much',
      author: 'adi',
      url: 'bruh',
      likes: 9,
      __v: 0
    },
    {
      _id: '23434452112',
      title: 'not much',
      author: 'mani',
      url: 'bruh',
      likes: 3,
      __v: 0
    },
    {
      _id: '5635tyhdf53ffg3',
      title: 'not much',
      author: 'me',
      url: 'bruh',
      likes: 8,
      __v: 0
    }
  ]

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyList)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('One blog', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  test('No blogs', () => {
    assert.strictEqual(listHelper.totalLikes(emptyList), 0)
  })

  test('Multiple blogs', () => {
    assert.strictEqual(listHelper.totalLikes(listWithMultipleBlogs), 21)
  })
})

describe('favorite blog', () => {
  test('Many blogs', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithMultipleBlogs), listWithMultipleBlogs[1])
  })

  test('One blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
  })

  test('Empty list', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(emptyList), {})
  })
})

describe('most blogs', () => {
  test('Many blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithMultipleBlogs), { author: "me", blogs: 2 })
  })

  test('One blog', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), { author: "me", blogs: 1 })
  })

  test('Empty list', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(emptyList), {})
  })
})

describe('most liked author', () => {
  test('Many blogs', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithMultipleBlogs), { author: "me", likes: 9 })
  })

  test('One blog', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), { author: "me", likes: 5 })
  })

  test('Empty list', () => {
    assert.deepStrictEqual(listHelper.mostLikes(emptyList), {})
  })
})