import type { Meta, StoryObj } from '@storybook/react'

import { CreateBlogPostPage } from '.'

const meta = {
  title: 'Pages/CreateBlogPostPage',
  component: CreateBlogPostPage,
  tags: ['autodocs'],
} satisfies Meta<typeof CreateBlogPostPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
