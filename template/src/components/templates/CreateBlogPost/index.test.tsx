import { useEffect } from 'react'
import { act } from 'react-dom/test-utils'

import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Router } from 'react-router-dom'
import { mockGrid, mockTextField, mockToolbar } from 'utils/test'

import { CreateBlogPost } from '.'

describe('<CreateBlogPost />', () => {
  it('Form is rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <CreateBlogPost />
      </BrowserRouter>,
    )

    expect(mockToolbar.mock.calls.length).toBe(1)

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.container).toBe(true)

    const createBlogPost = grid.children
    expect(createBlogPost.type.render.displayName).toBe('Styled(Grid)')
    expect(createBlogPost.props.item).toBe(true)
    expect(createBlogPost.props.xs).toBe(12)

    expect(createBlogPost.props.children.length).toBe(3)

    {
      const buttonContainer = createBlogPost.props.children[0]
      expect(buttonContainer.props.children.length).toBe(2)

      const backButton = buttonContainer.props.children[0]
      expect(backButton.type.render.name).toBe('Button')
      expect(backButton.props.size).toBe('small')
      expect(backButton.props.color).toBe('inherit')
      expect(backButton.props.style).toEqual({ marginBottom: 16 })
      expect(backButton.props.startIcon.type.type.render.displayName).toBe(
        'ArrowBackIosNewIcon',
      )
      expect(backButton.props.onClick.name).toBe('handleBack')
      expect(backButton.props.children).toBe('Posts')

      const createButton = buttonContainer.props.children[1]
      expect(createButton.type.render.name).toBe('Button')
      expect(createButton.props.size).toBe('small')
      expect(createButton.props.variant).toBe('contained')
      expect(createButton.props.style).toEqual({ marginBottom: 16 })
      expect(createButton.props.disabled).toBe(undefined)
      expect(createButton.props.onClick.name).toBe('handleCreate')
      expect(createButton.props.children).toBe('Create')
    }

    {
      const titleContainer = createBlogPost.props.children[1]
      expect(titleContainer.props.children.length).toBe(2)

      const titleLabel = titleContainer.props.children[0]
      expect(titleLabel.type.name).toBe('Typography')
      expect(titleLabel.props.sx).toEqual({ marginRight: '10px' })
      expect(titleLabel.props.children).toEqual(['Title', ':'])

      const inputTitle = titleContainer.props.children[1]
      expect(inputTitle.type.name).toBe('TextField')
      expect(inputTitle.props.size).toBe('small')
      expect(inputTitle.props.fullWidth).toBe(true)
      expect(inputTitle.props.value).toBe('')
      expect(inputTitle.props.error).toBe(false)
      expect(inputTitle.props.helperText).toBe('')
      expect(inputTitle.props.sx).toEqual({ marginBottom: '24px' })
      expect(inputTitle.props.onChange.name).toBe('onChange')
    }

    {
      const descriptionContainer = createBlogPost.props.children[2]
      expect(descriptionContainer.props.children.length).toBe(2)

      const descriptionLabel = descriptionContainer.props.children[0]
      expect(descriptionLabel.type.name).toBe('Typography')
      expect(descriptionLabel.props.sx).toEqual({ marginRight: '10px' })
      expect(descriptionLabel.props.children).toEqual(['Description', ':'])

      const inputDescription = descriptionContainer.props.children[1]
      expect(inputDescription.type.name).toBe('TextField')
      expect(inputDescription.props.fullWidth).toBe(true)
      expect(inputDescription.props.multiline).toBe(true)
      expect(inputDescription.props.minRows).toBe(10)
      expect(inputDescription.props.value).toBe('')
      expect(inputDescription.props.error).toBe(false)
      expect(inputDescription.props.helperText).toBe('')
      expect(inputDescription.props.sx).toEqual({ marginBottom: '24px' })
      expect(inputDescription.props.onChange.name).toBe('onChange')
    }

    expect(container).toMatchSnapshot()
  })

  it('Go to posts page when back button is clicked', async () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/posts'] })
    history.push = mockPush

    render(
      <Router location={history.location} navigator={history}>
        <CreateBlogPost />
      </Router>,
    )

    expect(mockPush).not.toBeCalled()
    fireEvent.click(screen.getByText('Posts'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/')
  })

  it('Show and hide error messages', async () => {
    render(
      <BrowserRouter>
        <CreateBlogPost />
      </BrowserRouter>,
    )

    let grid = mockGrid.mock.calls[0][0]
    let createBlogPost = grid.children

    {
      const titleContainer = createBlogPost.props.children[1]
      const inputTitle = titleContainer.props.children[1]
      expect(inputTitle.props.error).toBe(false)
      expect(inputTitle.props.helperText).toBe('')
    }

    {
      const descriptionContainer = createBlogPost.props.children[2]
      const inputDescription = descriptionContainer.props.children[1]
      expect(inputDescription.props.error).toBe(false)
      expect(inputDescription.props.helperText).toBe('')
    }

    // Click the create button
    mockGrid.mockClear()
    fireEvent.click(screen.getByText('Create'))

    grid = mockGrid.mock.calls[0][0]
    createBlogPost = grid.children

    {
      const titleContainer = createBlogPost.props.children[1]
      const inputTitle = titleContainer.props.children[1]
      expect(inputTitle.props.error).toBe(true)
      expect(inputTitle.props.helperText).toBe('Please input the post title.')
    }

    {
      const descriptionContainer = createBlogPost.props.children[2]
      const inputDescription = descriptionContainer.props.children[1]
      expect(inputDescription.props.error).toBe(true)
      expect(inputDescription.props.helperText).toBe(
        'Please input the post description.',
      )
    }

    // Disappear error messages when input is changed
    act(() => {
      mockTextField.mock.calls[2][0].onChange({
        target: { value: 'test title' },
      })
      mockTextField.mock.calls[3][0].onChange({
        target: { value: 'test description' },
      })
    })

    grid = mockGrid.mock.calls[3][0]
    createBlogPost = grid.children

    {
      const titleContainer = createBlogPost[1]
      const inputTitle = titleContainer.props.children[1]
      expect(inputTitle.props.error).toBe(false)
      expect(inputTitle.props.helperText).toBe('')
      expect(inputTitle.props.value).toBe('test title')
    }

    {
      const descriptionContainer = createBlogPost[2]
      const inputDescription = descriptionContainer.props.children[1]
      expect(inputDescription.props.error).toBe(false)
      expect(inputDescription.props.helperText).toBe('')
      expect(inputDescription.props.value).toBe('test description')
    }
  })

  it('The create button is disabled when isCreating is true', async () => {
    render(
      <BrowserRouter>
        <CreateBlogPost isCreating />
      </BrowserRouter>,
    )

    const grid = mockGrid.mock.calls[0][0]
    const createBlogPost = grid.children
    {
      const buttonContainer = createBlogPost.props.children[0]
      const createButton = buttonContainer.props.children[1]
      expect(createButton.props.disabled).toBe(true)
      expect(createButton.props.children.type.render.name).toBe(
        'CircularProgress',
      )
      expect(createButton.props.children.props).toEqual({ size: '1rem' })
    }
  })

  it('onCreatePost is called when creating is succeed', async () => {
    let titleData = ''
    let descriptionData = ''

    render(
      <BrowserRouter>
        <CreateBlogPost
          onCreatePost={(title, description) => {
            titleData = title
            descriptionData = description
          }}
        />
      </BrowserRouter>,
    )

    const grid = mockGrid.mock.calls[0][0]
    const createBlogPost = grid.children

    {
      const titleContainer = createBlogPost.props.children[1]
      const inputTitle = titleContainer.props.children[1]
      expect(inputTitle.props.error).toBe(false)
      expect(inputTitle.props.helperText).toBe('')
    }

    {
      const descriptionContainer = createBlogPost.props.children[2]
      const inputDescription = descriptionContainer.props.children[1]
      expect(inputDescription.props.error).toBe(false)
      expect(inputDescription.props.helperText).toBe('')
    }

    act(() => {
      mockTextField.mock.calls[0][0].onChange({
        target: { value: 'test title' },
      })
      mockTextField.mock.calls[1][0].onChange({
        target: { value: 'test description' },
      })
    })

    expect(titleData).toBe('')
    expect(descriptionData).toBe('')

    // Click the create button
    mockGrid.mockClear()
    fireEvent.click(screen.getByText('Create'))

    expect(titleData).toBe('test title')
    expect(descriptionData).toBe('test description')
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
      return <CreateBlogPost />
    }

    it('English', () => {
      render(
        <BrowserRouter>
          <TestComponent initLanguage="en" />
        </BrowserRouter>,
      )

      expect(screen.queryByText('Posts')).toBeInTheDocument()
      expect(screen.queryByText('ポスト')).not.toBeInTheDocument()
      expect(screen.queryByText('게시글')).not.toBeInTheDocument()

      expect(screen.queryByText('Create')).toBeInTheDocument()
      expect(screen.queryByText('生成')).not.toBeInTheDocument()
      expect(screen.queryByText('생성')).not.toBeInTheDocument()

      expect(screen.queryByText('Title:')).toBeInTheDocument()
      expect(screen.queryByText('タイトル:')).not.toBeInTheDocument()
      expect(screen.queryByText('제목:')).not.toBeInTheDocument()

      expect(screen.queryByText('Description:')).toBeInTheDocument()
      expect(screen.queryByText('内容:')).not.toBeInTheDocument()
      expect(screen.queryByText('내용:')).not.toBeInTheDocument()

      // Click the create button
      mockGrid.mockClear()
      fireEvent.click(screen.getByText('Create'))

      const grid = mockGrid.mock.calls[0][0]
      const createBlogPost = grid.children

      {
        const titleContainer = createBlogPost.props.children[1]
        const inputTitle = titleContainer.props.children[1]
        expect(inputTitle.props.helperText).toBe('Please input the post title.')
        expect(inputTitle.props.helperText).not.toBe(
          'タイトルを入力してください。',
        )
        expect(inputTitle.props.helperText).not.toBe('제목을 입력해주세요.')
      }

      {
        const descriptionContainer = createBlogPost.props.children[2]
        const inputDescription = descriptionContainer.props.children[1]
        expect(inputDescription.props.helperText).toBe(
          'Please input the post description.',
        )
        expect(inputDescription.props.helperText).not.toBe(
          '内容を入力してください。',
        )
        expect(inputDescription.props.helperText).not.toBe(
          '내용을 입력해주세요.',
        )
      }
    })

    it('Japanese', () => {
      render(
        <BrowserRouter>
          <TestComponent initLanguage="ja" />
        </BrowserRouter>,
      )

      expect(screen.queryByText('Posts')).not.toBeInTheDocument()
      expect(screen.queryByText('ポスト')).toBeInTheDocument()
      expect(screen.queryByText('게시글')).not.toBeInTheDocument()

      expect(screen.queryByText('Create')).not.toBeInTheDocument()
      expect(screen.queryByText('生成')).toBeInTheDocument()
      expect(screen.queryByText('생성')).not.toBeInTheDocument()

      expect(screen.queryByText('Title:')).not.toBeInTheDocument()
      expect(screen.queryByText('タイトル:')).toBeInTheDocument()
      expect(screen.queryByText('제목:')).not.toBeInTheDocument()

      expect(screen.queryByText('Description:')).not.toBeInTheDocument()
      expect(screen.queryByText('内容:')).toBeInTheDocument()
      expect(screen.queryByText('내용:')).not.toBeInTheDocument()

      // Click the create button
      mockGrid.mockClear()
      fireEvent.click(screen.getByText('生成'))

      const grid = mockGrid.mock.calls[0][0]
      const createBlogPost = grid.children

      {
        const titleContainer = createBlogPost.props.children[1]
        const inputTitle = titleContainer.props.children[1]
        expect(inputTitle.props.helperText).not.toBe(
          'Please input the post title.',
        )
        expect(inputTitle.props.helperText).toBe('タイトルを入力してください。')
        expect(inputTitle.props.helperText).not.toBe('제목을 입력해주세요.')
      }

      {
        const descriptionContainer = createBlogPost.props.children[2]
        const inputDescription = descriptionContainer.props.children[1]
        expect(inputDescription.props.helperText).not.toBe(
          'Please input the post description.',
        )
        expect(inputDescription.props.helperText).toBe(
          '内容を入力してください。',
        )
        expect(inputDescription.props.helperText).not.toBe(
          '내용을 입력해주세요.',
        )
      }
    })

    it('Korean', () => {
      render(
        <BrowserRouter>
          <TestComponent initLanguage="ko" />
        </BrowserRouter>,
      )

      expect(screen.queryByText('Posts')).not.toBeInTheDocument()
      expect(screen.queryByText('ポスト')).not.toBeInTheDocument()
      expect(screen.queryByText('게시글')).toBeInTheDocument()

      expect(screen.queryByText('Create')).not.toBeInTheDocument()
      expect(screen.queryByText('生成')).not.toBeInTheDocument()
      expect(screen.queryByText('생성')).toBeInTheDocument()

      expect(screen.queryByText('Title:')).not.toBeInTheDocument()
      expect(screen.queryByText('タイトル:')).not.toBeInTheDocument()
      expect(screen.queryByText('제목:')).toBeInTheDocument()

      expect(screen.queryByText('Description:')).not.toBeInTheDocument()
      expect(screen.queryByText('内容:')).not.toBeInTheDocument()
      expect(screen.queryByText('내용:')).toBeInTheDocument()

      // Click the create button
      mockGrid.mockClear()
      fireEvent.click(screen.getByText('생성'))

      const grid = mockGrid.mock.calls[0][0]
      const createBlogPost = grid.children

      {
        const titleContainer = createBlogPost.props.children[1]
        const inputTitle = titleContainer.props.children[1]
        expect(inputTitle.props.helperText).not.toBe(
          'Please input the post title.',
        )
        expect(inputTitle.props.helperText).not.toBe(
          'タイトルを入力してください。',
        )
        expect(inputTitle.props.helperText).toBe('제목을 입력해주세요.')
      }

      {
        const descriptionContainer = createBlogPost.props.children[2]
        const inputDescription = descriptionContainer.props.children[1]
        expect(inputDescription.props.helperText).not.toBe(
          'Please input the post description.',
        )
        expect(inputDescription.props.helperText).not.toBe(
          '内容を入力してください。',
        )
        expect(inputDescription.props.helperText).toBe('내용을 입력해주세요.')
      }
    })
  })
})
