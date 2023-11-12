const mockBlogListPage = jest.fn()
const mockPostDetailPage = jest.fn()
const mockCreateBlogPostPage = jest.fn()

jest.mock('components/pages', () => {
  const {
    BlogListPage: BlogListPageComponent,
    PostDetailPage: PostDetailPageComponent,
    CreateBlogPostPage: CreateBlogPostPageComponent,
    ...rest
  } = jest.requireActual('components/pages')

  const BlogListPage = (props: typeof BlogListPageComponent) => {
    mockBlogListPage(props)
    return <BlogListPageComponent {...props} />
  }

  const PostDetailPage = (props: typeof PostDetailPageComponent) => {
    mockPostDetailPage(props)
    return <PostDetailPageComponent {...props} />
  }

  const CreateBlogPostPage = (props: typeof CreateBlogPostPageComponent) => {
    mockCreateBlogPostPage(props)
    return <CreateBlogPostPageComponent {...props} />
  }

  return {
    BlogListPage,
    PostDetailPage,
    CreateBlogPostPage,
    ...rest,
  }
})

export { mockBlogListPage, mockPostDetailPage, mockCreateBlogPostPage }
