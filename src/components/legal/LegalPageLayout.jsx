import { Link, useNavigate, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

import { supportedLanguages } from '../../i18n'
import { tavernInfo } from '../../data/tavernInfo'
import {
  getLegalPath,
  resolveLegalPage,
} from '../../config/legalRoutes'
import { saveLanguage } from '../../utils/languagePreference'

const languageLabels = {
  es: 'ES',
  en: 'EN',
  fr: 'FR',
}

function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { lang, legalSlug } = useParams()

  const currentLanguage = supportedLanguages.includes(lang)
    ? lang
    : supportedLanguages.includes(i18n.resolvedLanguage)
      ? i18n.resolvedLanguage
      : 'es'

  const currentLegalPage = resolveLegalPage(
    currentLanguage,
    legalSlug
  )

  const changeLanguage = (language) => {
    if (!supportedLanguages.includes(language)) {
      return
    }

    saveLanguage(language)

    if (currentLegalPage) {
      navigate(getLegalPath(language, currentLegalPage))
      return
    }

    navigate(`/${language}`)
  }

  return (
    <main className="min-h-screen bg-[#18130f] px-6 py-16 text-[#f5efe6] md:py-24">
      <article className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to={`/${currentLanguage}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#c89b5c] transition hover:text-[#d7ad70]"
          >
            <span aria-hidden="true">←</span>

            {t('legal.backToWebsite')}
          </Link>

          <div
            className="flex items-center gap-2"
            aria-label={t('accessibility.changeLanguage')}
          >
            {supportedLanguages.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => changeLanguage(language)}
                className={`flex h-10 min-w-12 items-center justify-center rounded-full border px-3 text-xs font-semibold tracking-[0.12em] transition ${
                  currentLanguage === language
                    ? 'border-[#c89b5c] bg-[#c89b5c] text-[#18130f]'
                    : 'border-[#c89b5c]/30 text-[#c89b5c] hover:border-[#c89b5c]'
                }`}
                aria-current={
                  currentLanguage === language
                    ? 'page'
                    : undefined
                }
              >
                {languageLabels[language]}
              </button>
            ))}
          </div>
        </div>

        <header className="mt-14 border-b border-[#c89b5c]/20 pb-10">
          <p className="section-eyebrow">
            {eyebrow}
          </p>

          <h1 className="font-display mt-5 text-5xl font-semibold leading-none tracking-[-0.04em] text-[#f5efe6] sm:text-6xl md:text-7xl">
            {title}
          </h1>

          {lastUpdated && (
            <p className="mt-6 text-sm text-[#b8aa98]">
              {t('legal.lastUpdated')}: {lastUpdated}
            </p>
          )}
        </header>

        <div className="legal-content mt-12 space-y-10 text-base leading-8 text-[#d8cfc2]">
          {children}
        </div>

        <footer className="mt-16 border-t border-[#c89b5c]/20 pt-8">
          <p className="text-sm text-[#b8aa98]">
            © {new Date().getFullYear()}{' '}
            {tavernInfo.name}
          </p>
        </footer>
      </article>
    </main>
  )
}

export default LegalPageLayout