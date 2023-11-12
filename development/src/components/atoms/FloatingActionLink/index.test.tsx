import AddIcon from '@mui/icons-material/Add'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'
import { mockLink } from 'utils/test'

import { FloatingActionLink } from '.'

describe('<FloatingActionLink />', () => {
  it('Rendered well with string', async () => {
    const { container } = render(
      <BrowserRouter>
        <FloatingActionLink link="/posts/add">Add</FloatingActionLink>,
      </BrowserRouter>,
    )

    const link = mockLink.mock.calls[0][0]
    expect(link.to).toBe('/posts/add')

    const button = link.children
    expect(button.type.render.displayName).toBe('Styled(Component)')

    const style = button.type.__emotion_styles[0]
    expect(style.includes('position: fixed;')).toBe(true)
    expect(style.includes('right: 40px;')).toBe(true)
    expect(style.includes('bottom: 40px;')).toBe(true)

    expect(button.type.__emotion_base.render.name).toBe('Fab')
    expect(button.props.color).toBe('primary')
    expect(button.props['aria-label']).toBe('add')
    expect(button.props.children).toBe('Add')

    expect(container).toMatchSnapshot()
  })

  it('Rendered well with icon', async () => {
    const { container } = render(
      <BrowserRouter>
        <FloatingActionLink link="/posts/add">
          <AddIcon />
        </FloatingActionLink>
      </BrowserRouter>,
    )

    const link = mockLink.mock.calls[0][0]
    expect(link.to).toBe('/posts/add')

    const button = link.children
    expect(button.type.render.displayName).toBe('Styled(Component)')

    const style = button.type.__emotion_styles[0]
    expect(style.includes('position: fixed;')).toBe(true)
    expect(style.includes('right: 40px;')).toBe(true)
    expect(style.includes('bottom: 40px;')).toBe(true)
    expect(button.type.__emotion_base.render.name).toBe('Fab')
    expect(button.props.color).toBe('primary')
    expect(button.props['aria-label']).toBe('add')

    const icon = button.props.children
    expect(icon.type.type.render.displayName).toBe('AddIcon')
    expect(icon.type.type.render.muiName).toBe('SvgIcon')

    expect(container).toMatchSnapshot()
  })

  it('Go to the link page when the button is clicked', async () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/'] })
    history.push = mockPush

    render(
      <Router location={history.location} navigator={history}>
        <FloatingActionLink link="/posts/add">Add</FloatingActionLink>,
      </Router>,
    )

    fireEvent.click(screen.getByText('Add'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/posts/add')
  })
})
