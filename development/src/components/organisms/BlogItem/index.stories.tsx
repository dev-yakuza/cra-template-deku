import type { Meta, StoryObj } from '@storybook/react'

import { BlogItem } from '.'

const meta = {
  title: 'Organisms/BlogItem',
  component: BlogItem,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 1,
    title: 'This is the blog title',
    body: 'This is the blog contents.',
  },
}
