---
to: src/components/<%= type %>/<%= name %>/index.stories.tsx
---
import type { Meta, StoryObj } from '@storybook/react'

import { <%= name %> } from '.'

const meta = {
  title: 'Atoms/<%= name %>',
  component: <%= name %>,
  tags: ['autodocs'],
} satisfies Meta<typeof <%= name %>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
}
