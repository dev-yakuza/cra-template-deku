import { useLayoutEffect } from 'react'

import { PageContainer } from 'components/atoms'
import { Header } from 'components/organisms'
import {
  BlogListPage,
  CreateBlogPostPage,
  PostDetailPage,
} from 'components/pages'
import { defaultLanguage } from 'locales/i18n'
import { useTranslation } from 'react-i18next'
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

const MainRoutes = (
  <>
    <Route index element={<BlogListPage />} />,
    <Route path="/posts/:id" element={<PostDetailPage />} />,
    <Route path="/posts/add" element={<CreateBlogPostPage />} />,
  </>
)

const LocaleRoutes = () => {
  const { locale } = useParams()
  const { i18n } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    i18n.changeLanguage(locale)
    if (locale === defaultLanguage) {
      navigate(pathname.replace(`/${defaultLanguage}/`, '/'))
    }
  }, [locale])

  return <Routes>{MainRoutes}</Routes>
}

function App() {
  return (
    <PageContainer>
      <Header />
      <Routes>
        {MainRoutes}
        <Route path="/:locale/*" element={<LocaleRoutes />} />
      </Routes>
    </PageContainer>
  )
}

export default App
