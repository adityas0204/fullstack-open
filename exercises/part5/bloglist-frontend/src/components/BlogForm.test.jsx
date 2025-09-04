import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('correct form info passed', async () => {
  const handleNewBlog = vi.fn()
  
  render(<BlogForm handleNewBlog={handleNewBlog} />)

  const title = screen.getByPlaceholderText('write title')
  const author = screen.getByPlaceholderText('write author')
  const url = screen.getByPlaceholderText('write url')
  const submitButton = screen.getByText('create')

  await userEvent.type(title, 'holy')
  await userEvent.type(author, 'mongus')
  await userEvent.type(url, 'www')
  await userEvent.click(submitButton)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0]).toStrictEqual({ title: 'holy', author: 'mongus', url: 'www' })
})