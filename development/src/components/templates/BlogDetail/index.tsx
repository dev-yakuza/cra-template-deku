import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  Button,
  Divider,
  Grid,
  Skeleton,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import type { Post } from 'types'

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
  readonly post?: Post
}

const BlogDetail = ({ post }: Props) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <>
      <Toolbar />
      <Grid container>
        <Container item xs={12}>
          <Button
            size="small"
            color="inherit"
            startIcon={<ArrowBackIosNewIcon />}
            style={{ marginBottom: 16 }}
            onClick={handleBack}
          >
            {t('Posts')}
          </Button>
          <Typography
            variant="h1"
            style={{ margin: '0 16px', fontWeight: 600 }}
          >
            {post ? post.title : <Skeleton />}
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          <Typography style={{ margin: '0 8px' }}>
            {post ? (
              post.body
            ) : (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )}
          </Typography>
        </Container>
      </Grid>
    </>
  )
}

export { BlogDetail }
