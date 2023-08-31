import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'components/atoms'

const Container = styled(Grid)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    10px 10px 30px #d9d9d9,
    -10px -10px 30px #fff;
  margin: 20px;
  padding: 20px;
`

interface Props {
  readonly id: number
  readonly title: string
  readonly body: string
}

export const BlogItem = ({ id, title, body }: Props) => {
  return (
    <Container item xs={12}>
      <Link to={`/posts/${id}`}>
        <Typography>{title}</Typography>
        <Typography>{body}</Typography>
      </Link>
    </Container>
  )
}
