import { useGetPost } from 'api/posts'
import { BlogDetail } from 'components/templates'
import { useParams } from 'react-router-dom'

export const PostDetailPage = () => {
  const { id } = useParams()
  const { data } = useGetPost({ id })

  return <BlogDetail post={data} />
}
