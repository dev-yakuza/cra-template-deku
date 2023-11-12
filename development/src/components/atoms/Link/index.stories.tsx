import type { Meta, StoryObj } from '@storybook/react'

import { Link } from '.'

const meta = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    to: '/posts/1',
    children: 'This is the link component.',
  },
}

export const Component: Story = {
  args: {
    to: '/posts/2',
    children: <h1>This is the link component.</h1>,
  },
}
