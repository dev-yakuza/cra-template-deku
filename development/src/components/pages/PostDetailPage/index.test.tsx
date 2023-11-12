import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Route, Router, Routes } from 'react-router-dom'
import { mockBlogDetail } from 'utils/test'
import mockPostData from 'utils/test/mocks/api/mockData/post.json'

import type { Post } from 'types'

import { PostDetailPage } from '.'

let mockResponse: { readonly data: Post | undefined } = {
  data: undefined,
}
jest.mock('api/posts', () => ({
  useGetPost: ({ id }: { readonly id: string | undefined }) =>
    typeof id === 'string' && !isNaN(Number.parseInt(id))
      ? mockResponse
      : { data: undefined },
}))
let history = createMemoryHistory({ initialEntries: ['/posts/1'] })

describe('<PostDetailPage />', () => {
  it('rendered well with data', () => {
    mockResponse = { data: mockPostData }

    const { container } = render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Routes>
      </Router>,
    )

    expect(mockBlogDetail.mock.calls.length).toBe(1)
    expect(mockBlogDetail.mock.calls[0][0].post).toBe(mockPostData)

    expect(container).toMatchSnapshot()
  })

  it('rendered well without data', () => {
    mockResponse = { data: undefined }

    const { container } = render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Routes>
      </Router>,
    )

    expect(mockBlogDetail.mock.calls.length).toBe(1)
    expect(mockBlogDetail.mock.calls[0][0].post).toBe(undefined)

    expect(container).toMatchSnapshot()
  })

  it('rendered well with wrong ID query', () => {
    mockResponse = { data: mockPostData }
    history = createMemoryHistory({ initialEntries: ['/posts/aaa'] })

    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Routes>
      </Router>,
    )

    expect(mockBlogDetail.mock.calls.length).toBe(1)
    expect(mockBlogDetail.mock.calls[0][0].post).toBe(undefined)
  })
})
