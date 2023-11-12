import TranslateIcon from '@mui/icons-material/Translate'

import type { Meta, StoryObj } from '@storybook/react'

import { IconSelectBox } from '.'

const meta = {
  title: 'Atoms/IconSelectBox',
  component: IconSelectBox,
  tags: ['autodocs'],
} satisfies Meta<typeof IconSelectBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <TranslateIcon />,
    items: [
      {
        title: 'English',
        value: 'en',
      },
      {
        title: '日本語',
        value: 'ja',
      },
      {
        title: '한국어',
        value: 'ko',
      },
    ],
  },
}
