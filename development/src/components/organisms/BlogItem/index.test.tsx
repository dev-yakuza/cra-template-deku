import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'
import { mockGrid } from 'utils/test'

import { BlogItem } from '.'

describe('<BlogItem />', () => {
  it('Rendered well', () => {
    const { container } = render(
      <BrowserRouter>
        <BlogItem
          id={1}
          title="This is the blog title."
          body="This is the blog contents."
        />
      </BrowserRouter>,
    )

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.item).toBe(true)
    expect(grid.xs).toBe(12)

    const link = grid.children
    expect(link.type.render.displayName).toBe('Styled(Link)')
    expect(link.props.to).toBe('/posts/1')

    const titleComponent = link.props.children[0]
    expect(titleComponent.type.name).toBe('Typography')
    expect(titleComponent.props.children).toBe('This is the blog title.')

    const contentsComponent = link.props.children[1]
    expect(contentsComponent.type.name).toBe('Typography')
    expect(contentsComponent.props.children).toBe('This is the blog contents.')

    expect(container).toMatchSnapshot()
  })

  it('Go to the post detail page when the post item is clicked', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/'] })
    history.push = mockPush

    render(
      <Router location={history.location} navigator={history}>
        <BlogItem
          id={2}
          title="This is the blog title."
          body="This is the blog contents."
        />
      </Router>,
    )

    fireEvent.click(screen.getByText('This is the blog title.'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/posts/2')
  })
})
