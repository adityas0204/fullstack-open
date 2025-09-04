import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('more info button works in blog', () => {
  beforeEach(() => {
    render(
      <Blog blog={{ title: 'Does this work?', author: 'Aditya Soni', url: 'Exists sometimes', likes: 2, user: {name: 'Aditya Soni', username: 'adi'}}} loggedInUser={'adi'} /> 
    )
  })

  test('renders only author and title', () => {
    screen.getByText('Does this work? Aditya Soni')

    const info = screen.queryByText('This shouldnt exist')
    expect(info).toBeNull()
  })

  test('renders extra content when button clicked', async () => {
    let info = screen.queryByText('Exists sometimes')
    expect(info).toBeNull()

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    info = screen.getByText('Exists sometimes', { exact: false }) 
    expect(info).toBeVisible()
  })
})

test('event handler recieves two clicks for like buttons two clicks', async () => {
  const mockHandler = vi.fn()
  
  render(
    <Blog blog={{ title: 'Does this work?', author: 'Aditya Soni', url: 'Exists sometimes', likes: 2, user: {name: 'Aditya Soni', username: 'adi'}}} loggedInUser={'adi'} handleLikes={mockHandler} /> 
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})


