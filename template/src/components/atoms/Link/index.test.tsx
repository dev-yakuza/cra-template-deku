import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'

import { Link } from '.'

describe('<Link />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <Link to="/posts/1">test link</Link>
      </BrowserRouter>,
    )

    const link = screen.getByText('test link')
    expect(link).toHaveStyle(`
      text-decoration: none;
      color: initial;
    `)

    expect(container).toMatchSnapshot()
  })

  it('Go to the link URL when the link is clicked', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/'] })
    history.push = mockPush

    render(
      <Router location={history.location} navigator={history}>
        <Link to="/posts/1">test link</Link>
      </Router>,
    )

    fireEvent.click(screen.getByText('test link'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/posts/1')
  })
})
