import { useCreatePost } from 'api/posts'
import { CreateBlogPost } from 'components/templates'
import { useNavigate } from 'react-router-dom'

const CreateBlogPostPage = () => {
  const navigate = useNavigate()

  const { mutate: createPost, isLoading: isCreating } = useCreatePost({
    onSuccess: () => {
      navigate('/')
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onError: () => {},
  })

  const handleCreate = (title: string, description: string) => {
    createPost({
      userId: 1,
      title,
      description,
    })
  }

  return <CreateBlogPost isCreating={isCreating} onCreatePost={handleCreate} />
}

export { CreateBlogPostPage }
