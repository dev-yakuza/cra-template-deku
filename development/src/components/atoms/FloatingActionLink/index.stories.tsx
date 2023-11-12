import AddIcon from '@mui/icons-material/Add'

import type { Meta, StoryObj } from '@storybook/react'

import { FloatingActionLink } from '.'

const meta = {
  title: 'Atoms/FloatingActionLink',
  component: FloatingActionLink,
  tags: ['autodocs'],
} satisfies Meta<typeof FloatingActionLink>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    link: '/posts/add',
    children: 'Add',
  },
}

export const Icon: Story = {
  args: {
    link: '/posts/add',
    children: <AddIcon />,
  },
}
