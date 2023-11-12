import { Box } from '@mui/material'
import { styled } from '@mui/system'

const Container = styled(Box)`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: scroll;
`

interface Props {
  readonly children: React.ReactNode
}

export const PageContainer = ({ children }: Props) => {
  return <Container>{children}</Container>
}
