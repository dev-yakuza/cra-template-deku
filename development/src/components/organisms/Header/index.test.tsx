import { useEffect } from 'react'

import { act, fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { languages } from 'locales/i18n'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Router } from 'react-router-dom'
import { mockAppBar, mockIconSelectBox, render } from 'utils/test'

import { Header } from '.'

describe('<Header />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    )

    const appBar = mockAppBar.mock.calls[0][0]
    expect(appBar.position).toBe('fixed')
    expect(appBar.elevation).toBe(4)
    expect(appBar.style).toEqual({
      backgroundColor: '#FFF',
    })

    const toolbar = appBar.children
    expect(toolbar.type.name).toBe('Toolbar')

    const children = toolbar.props.children
    {
      const box = children[0]
      expect(box.type.render.name).toBe('Box')
      expect(box.props.sx).toEqual({ flexGrow: 1 })

      const appTitleLink = box.props.children
      expect(appTitleLink.type.render.displayName).toBe('Styled(Link)')
      expect(appTitleLink.props.to).toBe('/')

      const appTitle = appTitleLink.props.children
      expect(appTitle.type.name).toBe('Typography')
      expect(appTitle.props.variant).toBe('h6')
      expect(appTitle.props.color).toBe('inherit')
      expect(appTitle.props.noWrap).toBe(true)
      expect(appTitle.props.children).toBe('Blog App')
    }

    {
      const iconSelectBox = children[1]
      expect(iconSelectBox.type.name).toBe('IconSelectBox')
      expect(iconSelectBox.props.icon.type.type.render.displayName).toBe(
        'TranslateIcon',
      )
      expect(iconSelectBox.props.items).toEqual(languages)
      expect(iconSelectBox.props.onSelect.name).toBe('changeLanguage')
    }

    expect(container).toMatchSnapshot()
  })

  it('Go to the root page when the app title is clicked', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/posts/1'] })
    history.push = mockPush

    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>,
    )

    fireEvent.click(screen.getByText('Blog App'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/')
  })

  it('URL is changed by selecting language', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/posts/1'] })
    history.push = mockPush

    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>,
    )

    {
      act(() => {
        mockIconSelectBox.mock.calls[0][0].onSelect('ja')
      })
      expect(mockPush.mock.calls[0][0].pathname).toBe('/ja/posts/1')
    }

    {
      act(() => {
        mockIconSelectBox.mock.calls[0][0].onSelect('ko')
      })
      expect(mockPush.mock.calls[1][0].pathname).toBe('/ko/posts/1')
    }

    {
      act(() => {
        mockIconSelectBox.mock.calls[0][0].onSelect('en')
      })
      expect(mockPush.mock.calls[2][0].pathname).toBe('/en/posts/1')
    }
  })

  describe('Support multiple languages', () => {
    const TestComponent = ({
      initLanguage,
    }: {
      readonly initLanguage: string
    }) => {
      const { i18n } = useTranslation()
      useEffect(() => {
        i18n.changeLanguage(initLanguage)
      }, [])
      return <Header />
    }

    it('English', () => {
      render(
        <BrowserRouter>
          <TestComponent initLanguage="en" />
        </BrowserRouter>,
      )

      expect(screen.queryByText('Blog App')).toBeInTheDocument()
      expect(screen.queryByText('ブログアプリ')).not.toBeInTheDocument()
      expect(screen.queryByText('블로그 앱')).not.toBeInTheDocument()
    })

    it('Japanese', () => {
      render(
        <BrowserRouter>
          <TestComponent initLanguage="ja" />
        </BrowserRouter>,
      )

      expect(screen.queryByText('Blog App')).not.toBeInTheDocument()
      expect(screen.queryByText('ブログアプリ')).toBeInTheDocument()
      expect(screen.queryByText('블로그 앱')).not.toBeInTheDocument()
    })

    it('Korean', () => {
      render(
        <BrowserRouter>
          <TestComponent initLanguage="ko" />
        </BrowserRouter>,
      )

      expect(screen.queryByText('Blog App')).not.toBeInTheDocument()
      expect(screen.queryByText('ブログアプリ')).not.toBeInTheDocument()
      expect(screen.queryByText('블로그 앱')).toBeInTheDocument()
    })
  })
})
