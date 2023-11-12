import TranslateIcon from '@mui/icons-material/Translate'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { IconSelectBox, Link } from 'components/atoms'
import { languages } from 'locales/i18n'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

export const Header = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const changeLanguage = (language: string) => {
    let path = pathname
    for (const lang of languages) {
      const localURL = `/${lang.value}`
      if (path.startsWith(localURL)) {
        path = path.replace(localURL, '')
        break
      }
    }
    navigate(`/${language}${path}`)
  }

  return (
    <AppBar position="fixed" elevation={4} style={{ backgroundColor: '#FFF' }}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Typography variant="h6" color="inherit" noWrap>
              {t('Blog App')}
            </Typography>
          </Link>
        </Box>
        <IconSelectBox
          icon={<TranslateIcon />}
          items={languages}
          onSelect={changeLanguage}
        />
      </Toolbar>
    </AppBar>
  )
}
