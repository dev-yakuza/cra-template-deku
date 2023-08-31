import type { Meta, StoryObj } from '@storybook/react'

import { CreateBlogPost } from '.'

const meta = {
  title: 'Templates/CreateBlogPost',
  component: CreateBlogPost,
  tags: ['autodocs'],
} satisfies Meta<typeof CreateBlogPost>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
