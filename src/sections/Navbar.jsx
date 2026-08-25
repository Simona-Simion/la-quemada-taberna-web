import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import { tavernInfo } from '../data/tavernInfo'
import { supportedLanguages } from '../i18n'
import { saveLanguage } from '../utils/languagePreference'

const languageLabels = {
  es: 'ES',
  en: 'EN',
  fr: 'FR',
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] =
    useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const currentLanguage = supportedLanguages.includes(
    i18n.resolvedLanguage
  )
    ? i18n.resolvedLanguage
    : 'es'

  const isHomePage = /^\/(es|en|fr)\/?$/.test(
    location.pathname
  )

  const isTransparent =
    isHomePage && !isScrolled && !isOpen

  const navLinks = [
    {
      label: t('navigation.about'),
      href: '#taberna',
    },
    {
      label: t('navigation.bar'),
      href: '#barra',
    },
    {
      label: t('navigation.menu'),
      href: '#carta',
    },
    {
      label: t('navigation.reviews'),
      href: '#eventos',
    },
    {
      label: t('navigation.visit'),
      href: '#visitanos',
    },
  ]

  const closeMenu = () => {
    setIsOpen(false)
    setIsLanguageOpen(false)
  }

  const changeLanguage = (language) => {
    if (!supportedLanguages.includes(language)) {
      return
    }

    saveLanguage(language)

    navigate({
      pathname: `/${language}`,
      search: location.search,
      hash: location.hash,
    })

    setIsLanguageOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )
    }
  }, [])

  useEffect(() => {
    document.body.style.overflowY = isOpen
      ? 'hidden'
      : ''

    return () => {
      document.body.style.overflowY = ''
    }
  }, [isOpen])

  return (
    <>
      <header
        className={`inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
          isHomePage ? 'fixed' : 'sticky'
        } ${
          isTransparent
            ? 'bg-linear-to-b from-black/75 via-black/35 to-transparent'
            : 'bg-[#18130f]/95 shadow-lg backdrop-blur-md'
        }`}
      >
        <nav className="relative z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <a
            href="#inicio"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-2.5 sm:gap-3.5"
            aria-label={t('accessibility.home')}
          >
            <span
              aria-hidden="true"
              className="block h-12 w-10 shrink-0 bg-[#d6c4a2] sm:h-14 sm:w-12 md:h-16 md:w-14"
              style={{
                WebkitMaskImage: `url(${tavernInfo.brand.logoIcon})`,
                maskImage: `url(${tavernInfo.brand.logoIcon})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />

            <span className="flex min-w-0 flex-col">
              <span className="font-display whitespace-nowrap text-[1.05rem] font-semibold uppercase leading-none tracking-[0.035em] text-[#f5efe6] [text-shadow:0_2px_10px_rgba(0,0,0,0.75)] sm:text-xl md:text-2xl">
                La Quemada
              </span>

              <span className="mt-1.5 flex items-center gap-2">
                <span className="hidden h-px w-5 bg-[#c89b5c]/60 sm:block" />

                <span className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.42em] text-[#c89b5c] [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] sm:text-[10px] sm:tracking-[0.5em]">
                  Taberna
                </span>

                <span className="hidden h-px w-5 bg-[#c89b5c]/60 sm:block" />
              </span>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setIsLanguageOpen(
                    (current) => !current
                  )
                }
                className="flex h-10 min-w-12 items-center justify-center rounded-full border border-[#c89b5c]/40 bg-[#18130f]/45 px-2.5 text-xs font-semibold tracking-[0.1em] text-[#c89b5c] backdrop-blur-sm transition hover:border-[#c89b5c] hover:bg-[#18130f]/70 sm:h-11 sm:min-w-14 sm:px-3 sm:text-sm"
                aria-label={t(
                  'accessibility.changeLanguage'
                )}
                aria-expanded={isLanguageOpen}
              >
                {languageLabels[currentLanguage]}

                <span
                  className={`ml-1 text-[10px] transition ${
                    isLanguageOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 top-12 min-w-24 border border-[#c89b5c]/30 bg-[#211b16] p-1 shadow-xl sm:top-14">
                  {supportedLanguages.map(
                    (language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() =>
                          changeLanguage(language)
                        }
                        className={`block w-full px-4 py-3 text-left text-sm font-semibold tracking-[0.15em] transition ${
                          currentLanguage === language
                            ? 'bg-[#c89b5c] text-[#18130f]'
                            : 'text-[#f5efe6] hover:bg-[#c89b5c]/10'
                        }`}
                      >
                        {languageLabels[language]}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen((current) => !current)
                setIsLanguageOpen(false)
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c89b5c]/40 bg-[#18130f]/45 text-[#f5efe6] backdrop-blur-sm transition hover:border-[#c89b5c] hover:bg-[#18130f]/70 hover:text-[#c89b5c] sm:h-11 sm:w-11"
              aria-label={
                isOpen
                  ? t('accessibility.closeMenu')
                  : t('accessibility.openMenu')
              }
              aria-expanded={isOpen}
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${
                    isOpen
                      ? 'translate-y-2 rotate-45'
                      : ''
                  }`}
                />

                <span
                  className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />

                <span
                  className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition ${
                    isOpen
                      ? '-translate-y-2 -rotate-45'
                      : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto overflow-x-hidden bg-[#18130f]">
          <div className="mx-auto flex min-h-svh max-w-6xl flex-col px-6 pb-10 pt-28 sm:pt-32 md:justify-center md:pt-24">
            <p className="section-eyebrow mb-5">
              {t('navigation.title')}
            </p>

            <div className="flex max-w-3xl flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="group border-b border-[#c89b5c]/20 py-4 md:py-5"
                >
                  <span className="nav-menu-link block break-words transition group-hover:text-[#c89b5c]">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar