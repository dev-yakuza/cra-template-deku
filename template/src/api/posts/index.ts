import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { AxiosError } from 'axios'
import type { Post } from 'types'

const POSTS_URL = `${process.env.REACT_APP_API_SERVER}/posts`

const getPosts = async (): Promise<ReadonlyArray<Post>> => {
  const response = await axios.get(POSTS_URL)

  return response.data
}

export const useGetPosts = () => {
  return useQuery(['GetPosts'], async () => getPosts(), {
    refetchOnWindowFocus: false,
  })
}

interface GetPostParams {
  readonly id: string | undefined
}

const getPost = async ({
  postID,
}: {
  readonly postID: number
}): Promise<Post> => {
  const response = await axios.get(`${POSTS_URL}/${postID}`)

  return response.data
}

export const useGetPost = ({ id }: GetPostParams) => {
  const postID =
    typeof id === 'string' && !isNaN(Number.parseInt(id))
      ? Number.parseInt(id)
      : undefined

  return useQuery(
    ['GetPost', id],
    async () => getPost({ postID: postID as number }),
    {
      refetchOnWindowFocus: false,
      enabled: postID !== undefined,
    },
  )
}

export interface CreatePostParams {
  readonly userId: number
  readonly title: string
  readonly description: string
}

const createPost = async ({
  userId,
  title,
  description,
}: CreatePostParams): Promise<Post> => {
  const response = await axios.post(POSTS_URL, {
    userId,
    title,
    description,
  })

  return response.data
}

interface CreatePostCallback {
  readonly onSuccess?: (data: Post) => void
  readonly onError?: (error: AxiosError) => void
}

export const useCreatePost = ({ onSuccess, onError }: CreatePostCallback) => {
  return useMutation(
    async ({ userId, title, description }: CreatePostParams) =>
      createPost({ userId, title, description }),
    {
      onSuccess,
      onError,
    },
  )
}
