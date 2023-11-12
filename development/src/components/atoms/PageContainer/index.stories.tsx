import type { Meta, StoryObj } from '@storybook/react'

import { PageContainer } from '.'

const meta = {
  title: 'Atoms/PageContainer',
  component: PageContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof PageContainer>

export default meta
type Story = StoryObj<typeof meta>

export const String: Story = {
  args: {
    children: 'This is PageContainer',
  },
}

export const Component: Story = {
  args: {
    children: <h1>This is PageContainer</h1>,
  },
}
