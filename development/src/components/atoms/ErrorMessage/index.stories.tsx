import { errorMessageState } from 'data/ErrorMessage'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import type { Meta, StoryObj } from '@storybook/react'

import { ErrorMessage } from '.'

interface TestComponentProps {
  readonly errorMessage: string
}
const Wrapper = ({ errorMessage }: TestComponentProps) => {
  const setErrorMessage = useSetRecoilState(errorMessageState)

  return (
    <>
      <ErrorMessage />
      <button onClick={() => setErrorMessage(errorMessage)}>Show</button>
    </>
  )
}

const TestComponent = (args: TestComponentProps) => (
  <RecoilRoot>
    <Wrapper {...args} />
  </RecoilRoot>
)

const meta = {
  title: 'Atoms/ErrorMessage',
  component: TestComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof TestComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    errorMessage: 'This is a sample error message',
  },
}
