import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router'
import { useTranslation } from 'react-i18next'

import App from './App'
import { supportedLanguages } from './i18n'
import { getSavedLanguage } from './utils/languagePreference'
import { resolveLegalPage } from './config/legalRoutes'
import LegalNotice from './pages/legal/LegalNotice'
import DataUsePage from './pages/legal/DataUsePage'
import SiteStoragePage from './pages/legal/SiteStoragePage'

function DefaultLanguageRedirect() {
  const savedLanguage = getSavedLanguage()

  const language = supportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : 'es'

  return <Navigate to={`/${language}`} replace />
}

function LocalizedRoute({ children }) {
  const { lang } = useParams()
  const { i18n } = useTranslation()

  const validLanguage = supportedLanguages.includes(lang)

  useEffect(() => {
    if (!validLanguage) {
      return
    }

    i18n.changeLanguage(lang)
    document.documentElement.lang = lang
  }, [lang, validLanguage, i18n])

  if (!validLanguage) {
    return <Navigate to="/es" replace />
  }

  return children
}

const legalPages = {
  notice: LegalNotice,
  privacy: DataUsePage,
  cookies: SiteStoragePage,
}

function LocalizedLegalPage() {
  const { lang, legalSlug } = useParams()
  const pageKey = resolveLegalPage(lang, legalSlug)

  if (!pageKey) {
    return <Navigate to={`/${lang}`} replace />
  }

  const LegalPage = legalPages[pageKey]

  return <LegalPage />
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DefaultLanguageRedirect />}
        />

        <Route
          path="/:lang"
          element={(
            <LocalizedRoute>
              <App />
            </LocalizedRoute>
          )}
        />

        <Route
          path="/:lang/:legalSlug"
          element={(
            <LocalizedRoute>
              <LocalizedLegalPage />
            </LocalizedRoute>
          )}
        />

        <Route
          path="*"
          element={<Navigate to="/es" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
