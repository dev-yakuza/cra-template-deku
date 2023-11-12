import { useGetPosts } from 'api/posts'
import { PageLoading } from 'components/atoms'
import { BlogList } from 'components/templates'

export const BlogListPage = () => {
  const { isLoading, data } = useGetPosts()

  if (isLoading) {
    return <PageLoading />
  }

  return <BlogList posts={data} />
}
