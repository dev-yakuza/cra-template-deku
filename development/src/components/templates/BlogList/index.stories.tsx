import type { Meta, StoryObj } from '@storybook/react'

import { BlogList } from '.'

const meta = {
  title: 'Templates/BlogList',
  component: BlogList,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithData: Story = {
  args: {
    posts: [
      { userId: 1, id: 1, title: 'blog title 1', body: 'blog contents 1' },
      { userId: 1, id: 2, title: 'blog title 2', body: 'blog contents 2' },
      { userId: 1, id: 3, title: 'blog title 3', body: 'blog contents 3' },
      { userId: 1, id: 4, title: 'blog title 4', body: 'blog contents 4' },
      { userId: 1, id: 5, title: 'blog title 5', body: 'blog contents 5' },
      { userId: 1, id: 6, title: 'blog title 6', body: 'blog contents 6' },
      { userId: 1, id: 7, title: 'blog title 7', body: 'blog contents 7' },
      { userId: 1, id: 8, title: 'blog title 8', body: 'blog contents 8' },
    ],
  },
}
