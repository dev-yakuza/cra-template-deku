import type { Meta, StoryObj } from '@storybook/react'

import { PostDetailPage } from '.'

const meta = {
  title: 'Pages/PostDetailPage',
  component: PostDetailPage,
  tags: ['autodocs'],
} satisfies Meta<typeof PostDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const NoData: Story = {}

export const WithData: Story = {
  parameters: {
    reactRouter: {
      routePath: '/posts/:id',
      routeParams: { id: '1' },
    },
  },
}
