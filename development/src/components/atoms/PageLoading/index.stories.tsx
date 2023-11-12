import type { Meta, StoryObj } from '@storybook/react'

import { PageLoading } from '.'

const meta = {
  title: 'Atoms/PageLoading',
  component: PageLoading,
  tags: ['autodocs'],
} satisfies Meta<typeof PageLoading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
