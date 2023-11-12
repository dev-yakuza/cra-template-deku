import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import {
  mockBlogListPage,
  mockCreateBlogPostPage,
  mockHeader,
  mockPageContainer,
  mockPostDetailPage,
} from 'utils/test'

import App from './App'

jest.mock('api/posts', () => ({
  useGetPosts: jest.fn,
  useGetPost: jest.fn,
  useCreatePost: jest.fn,
}))

describe('<App />', () => {
  describe('English', () => {
    test('/', () => {
      const history = createMemoryHistory({ initialEntries: ['/'] })

      render(
        <Router location={history.location} navigator={history}>
          <App />
        </Router>,
      )

      expect(mockPageContainer.mock.calls.length).toBe(1)
      expect(mockHeader.mock.calls.length).toBe(1)

      expect(mockBlogListPage.mock.calls.length).toBe(1)
      expect(mockPostDetailPage.mock.calls.length).toBe(0)
      expect(mockCreateBlogPostPage.mock.calls.length).toBe(0)
    })

    test('/posts/:id', () => {
      const history = createMemoryHistory({ initialEntries: ['/posts/1'] })

      render(
        <Router location={history.location} navigator={history}>
          <App />
        </Router>,
      )

      expect(mockPageContainer.mock.calls.length).toBe(1)
      expect(mockHeader.mock.calls.length).toBe(1)

      expect(mockBlogListPage.mock.calls.length).toBe(0)
      expect(mockPostDetailPage.mock.calls.length).toBe(1)
      expect(mockCreateBlogPostPage.mock.calls.length).toBe(0)
    })

    test('/posts/add', () => {
      const history = createMemoryHistory({ initialEntries: ['/posts/add'] })

      render(
        <Router location={history.location} navigator={history}>
          <App />
        </Router>,
      )

      expect(mockPageContainer.mock.calls.length).toBe(1)
      expect(mockHeader.mock.calls.length).toBe(1)

      expect(mockBlogListPage.mock.calls.length).toBe(0)
      expect(mockPostDetailPage.mock.calls.length).toBe(0)
      expect(mockCreateBlogPostPage.mock.calls.length).toBe(1)
    })
  })

  describe('Japanese', () => {
    test('/ja', () => {
      const history = createMemoryHistory({ initialEntries: ['/ja'] })

      render(
        <Router location={history.location} navigator={history}>
          <App />
        </Router>,
      )

      expect(mockPageContainer.mock.calls.length).toBe(1)
      expect(mockHeader.mock.calls.length).toBe(1)

      expect(mockBlogListPage.mock.calls.length).toBe(1)
      expect(mockPostDetailPage.mock.calls.length).toBe(0)
      expect(mockCreateBlogPostPage.mock.calls.length).toBe(0)
    })

    test('/ja/posts/:id', () => {
      const history = createMemoryHistory({ initialEntries: ['/ja/posts/1'] })

      render(
        <Router location={history.location} navigator={history}>
          <App />
        </Router>,
      )

      expect(mockPageContainer.mock.calls.length).toBe(1)
      expect(mockHeader.mock.calls.length).toBe(1)

      expect(mockBlogListPage.mock.calls.length).toBe(0)
      expect(mockPostDetailPage.mock.calls.length).toBe(1)
      expect(mockCreateBlogPostPage.mock.calls.length).toBe(0)
    })

    test('/ja/posts/add', () => {
      const history = createMemoryHistory({ initialEntries: ['/ja/posts/add'] })

      render(
        <Router location={history.location} navigator={history}>
          <App />
        </Router>,
      )

      expect(mockPageContainer.mock.calls.length).toBe(1)
      expect(mockHeader.mock.calls.length).toBe(1)

      expect(mockBlogListPage.mock.calls.length).toBe(0)
      expect(mockPostDetailPage.mock.calls.length).toBe(0)
      expect(mockCreateBlogPostPage.mock.calls.length).toBe(1)
    })
  })

  describe('Korean', () => {
    test('/ko', () => {
      const history = createMemoryHistory({ initialEntries: ['/ko'] })

      render(
        <Router location={history.location} navigator={history}>
          <App />
        </Router>,
      )

      expect(mockPageContainer.mock.calls.length).toBe(1)
      expect(mockHeader.mock.calls.length).toBe(1)

      expect(mockBlogListPage.mock.calls.length).toBe(1)
      expect(mockPostDetailPage.mock.calls.length).toBe(0)
      expect(mockCreateBlogPostPage.mock.calls.length).toBe(0)
    })

    test('/ko/posts/:id', () => {
      const history = createMemoryHistory({ initialEntries: ['/ko/posts/1'] })

      render(
        <Router location={history.location} navigator={history}>
          <App />
        </Router>,
      )

      expect(mockPageContainer.mock.calls.length).toBe(1)
      expect(mockHeader.mock.calls.length).toBe(1)

      expect(mockBlogListPage.mock.calls.length).toBe(0)
      expect(mockPostDetailPage.mock.calls.length).toBe(1)
      expect(mockCreateBlogPostPage.mock.calls.length).toBe(0)
    })

    test('/ko/posts/add', () => {
      const history = createMemoryHistory({ initialEntries: ['/ko/posts/add'] })

      render(
        <Router location={history.location} navigator={history}>
          <App />
        </Router>,
      )

      expect(mockPageContainer.mock.calls.length).toBe(1)
      expect(mockHeader.mock.calls.length).toBe(1)

      expect(mockBlogListPage.mock.calls.length).toBe(0)
      expect(mockPostDetailPage.mock.calls.length).toBe(0)
      expect(mockCreateBlogPostPage.mock.calls.length).toBe(1)
    })
  })
})
