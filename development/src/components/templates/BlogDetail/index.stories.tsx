import type { Meta, StoryObj } from '@storybook/react'

import { BlogDetail } from '.'

const meta = {
  title: 'Templates/BlogDetail',
  component: BlogDetail,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithData: Story = {
  args: {
    post: { userId: 1, id: 1, title: 'blog title 1', body: 'blog contents 1' },
  },
}
