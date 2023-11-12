import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'
import { mockCreateBlogPost, queryClient } from 'utils/test'

import type { CreatePostParams } from 'api/posts'
import type { AxiosError } from 'axios'
import type { Post } from 'types'

import { CreateBlogPostPage } from './index'

let mockAPISuccess = true
let mockIsLoading = false
let mockIsCalledOnSuccess = false
let mockIsCalledOnError = false
jest.mock('api/posts', () => ({
  useCreatePost: ({
    onSuccess,
    onError,
  }: {
    readonly onSuccess?: (data: Post) => void
    readonly onError?: (error: AxiosError) => void
  }) => ({
    mutate: ({ userId, title, description }: CreatePostParams) => {
      if (mockAPISuccess) {
        if (onSuccess !== undefined) {
          mockIsCalledOnSuccess = true
          onSuccess({
            userId,
            id: 1,
            title,
            body: description,
          })
        }
      } else {
        if (onError !== undefined) {
          mockIsCalledOnError = true
          onError(new Error('Error') as AxiosError)
        }
      }
    },
    isLoading: mockIsLoading,
  }),
}))

describe('<CreateBlogPost />', () => {
  beforeEach(() => {
    mockAPISuccess = true
    mockIsLoading = false
    mockIsCalledOnSuccess = false
    mockIsCalledOnError = false
  })

  it('rendered well', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CreateBlogPostPage />
        </BrowserRouter>
      </QueryClientProvider>,
    )

    expect(mockCreateBlogPost.mock.calls.length).toBe(1)
    expect(mockCreateBlogPost.mock.calls[0][0].isCreating).toBe(false)
    expect(mockCreateBlogPost.mock.calls[0][0].onCreatePost.name).toBe(
      'handleCreate',
    )

    expect(container).toMatchSnapshot()
  })

  it('rendered well with isLoading', () => {
    mockIsLoading = true

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CreateBlogPostPage />
        </BrowserRouter>
      </QueryClientProvider>,
    )

    expect(mockCreateBlogPost.mock.calls[0][0].isCreating).toBe(true)
  })

  it('success to create post', () => {
    mockAPISuccess = true
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/posts'] })
    history.push = mockPush

    render(
      <QueryClientProvider client={queryClient}>
        <Router location={history.location} navigator={history}>
          <CreateBlogPostPage />
        </Router>
        ,
      </QueryClientProvider>,
    )

    expect(mockIsCalledOnSuccess).toBe(false)
    expect(mockIsCalledOnError).toBe(false)
    expect(mockPush.mock.calls.length).toBe(0)

    // Call creating post
    mockCreateBlogPost.mock.calls[0][0].onCreatePost(
      'test title',
      'test description',
    )

    expect(mockIsCalledOnSuccess).toBe(true)
    expect(mockIsCalledOnError).toBe(false)
    expect(mockPush.mock.calls[0][0].pathname).toBe('/')
  })

  it('fail to create post', () => {
    mockAPISuccess = false

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CreateBlogPostPage />
        </BrowserRouter>
      </QueryClientProvider>,
    )

    expect(mockIsCalledOnSuccess).toBe(false)
    expect(mockIsCalledOnError).toBe(false)

    // Call creating post
    mockCreateBlogPost.mock.calls[0][0].onCreatePost(
      'test title',
      'test description',
    )

    expect(mockIsCalledOnSuccess).toBe(false)
    expect(mockIsCalledOnError).toBe(true)
  })
})
