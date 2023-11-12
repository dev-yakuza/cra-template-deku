import TranslateIcon from '@mui/icons-material/Translate'
import { fireEvent, render, screen } from '@testing-library/react'
import { mockIconButton, mockMenu } from 'utils/test'

import { IconSelectBox } from '.'

const supportLanguages = [
  {
    title: 'English',
    value: 'en',
  },
  {
    title: '日本語',
    value: 'ja',
  },
  {
    title: '한국어',
    value: 'ko',
  },
]

describe('<IconSelectBox />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <IconSelectBox
        icon={<TranslateIcon />}
        items={supportLanguages}
        onSelect={jest.fn}
      />,
    )

    const iconButton = mockIconButton.mock.calls[0][0]
    expect(iconButton['aria-controls']).toBe('IconSelectBox')
    expect(iconButton['aria-haspopup']).toBe('true')
    expect(iconButton.onClick.name).toBe('onClick')
    expect(iconButton['aria-label']).toBe('Open menu')
    expect(iconButton.title).toBe('Open menu')

    const icon = iconButton.children.type.type.render.displayName
    expect(icon).toBe('TranslateIcon')

    const menu = mockMenu.mock.calls[0][0]
    expect(menu.id).toBe('IconSelectBox')
    expect(menu.anchorEl).toBe(undefined)
    expect(menu.keepMounted).toBe(true)
    expect(menu.open).toBe(false)
    expect(menu.onClose.name).toBe('onClose')

    const menuItems = menu.children
    expect(menuItems.length).toBe(3)

    {
      const menuItem = menuItems[0]
      expect(menuItem.type.name).toBe('MenuItem')
      expect(menuItem.props.onClick.name).toBe('onClick')
      expect(menuItem.props.children).toBe('English')
    }

    {
      const menuItem = menuItems[1]
      expect(menuItem.type.name).toBe('MenuItem')
      expect(menuItem.props.onClick.name).toBe('onClick')
      expect(menuItem.props.children).toBe('日本語')
    }

    {
      const menuItem = menuItems[2]
      expect(menuItem.type.name).toBe('MenuItem')
      expect(menuItem.props.onClick.name).toBe('onClick')
      expect(menuItem.props.children).toBe('한국어')
    }

    expect(container).toMatchSnapshot()
  })

  it('onSelect', async () => {
    const mockOnSelect = jest.fn()

    render(
      <IconSelectBox
        icon={<TranslateIcon />}
        items={supportLanguages}
        onSelect={mockOnSelect}
      />,
    )

    expect(mockOnSelect).not.toBeCalled()

    {
      fireEvent.click(
        screen.getByRole('button', {
          name: /Open menu/i,
        }),
      )
      fireEvent.click(screen.getByText('English'))
      expect(mockOnSelect.mock.calls[0][0]).toBe('en')
      mockOnSelect.mockClear()
    }

    {
      fireEvent.click(
        screen.getByRole('button', {
          name: /Open menu/i,
        }),
      )
      fireEvent.click(screen.getByText('日本語'))
      expect(mockOnSelect.mock.calls[0][0]).toBe('ja')
      mockOnSelect.mockClear()
    }

    {
      fireEvent.click(
        screen.getByRole('button', {
          name: /Open menu/i,
        }),
      )
      fireEvent.click(screen.getByText('한국어'))
      expect(mockOnSelect.mock.calls[0][0]).toBe('ko')
      mockOnSelect.mockClear()
    }
  })
})
