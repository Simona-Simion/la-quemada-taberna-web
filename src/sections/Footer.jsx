import {
  useEffect,
  useState,
} from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { getLegalPath } from '../config/legalRoutes'
import { tavernInfo } from '../data/tavernInfo'
import { supportedLanguages } from '../i18n'
import { getTavernInfo } from '../sanity/menuService'

function Footer() {
  const { t, i18n } = useTranslation()

  const currentYear =
    new Date().getFullYear()

  const currentLanguage =
    supportedLanguages.includes(
      i18n.resolvedLanguage
    )
      ? i18n.resolvedLanguage
      : 'es'

  const [remoteInfo, setRemoteInfo] =
    useState(null)

  useEffect(() => {
    let isCancelled = false

    async function loadTavernInfo() {
      try {
        const information =
          await getTavernInfo(
            currentLanguage
          )

        if (!isCancelled) {
          setRemoteInfo(information)
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(
            'No se pudo cargar la información del footer desde Sanity:',
            error
          )

          setRemoteInfo(null)
        }
      }
    }

    loadTavernInfo()

    return () => {
      isCancelled = true
    }
  }, [currentLanguage])

  const hours = {
    weekday:
      remoteInfo?.hours?.weekday?.trim() ||
      t('visit.hours.weekday'),

    saturday:
      remoteInfo?.hours?.saturday?.trim() ||
      t('visit.hours.saturday'),

    sunday:
      remoteInfo?.hours?.sunday?.trim() ||
      t('visit.hours.sunday'),
  }

  const email =
    remoteInfo?.contact?.email?.trim() ||
    tavernInfo.contact.email

  const phone =
    remoteInfo?.contact?.phone?.trim() ||
    tavernInfo.contact.phone

  const phoneHref = phone
    ? phone.replace(/[^\d+]/g, '')
    : ''

  const instagramUrl =
    remoteInfo?.contact?.instagramUrl?.trim() ||
    tavernInfo.instagram.url

  const googleMapsUrl =
    remoteInfo?.contact?.googleMapsUrl?.trim() ||
    tavernInfo.googleMaps.url

  const navigationLinks = [
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
      label: t('footer.events'),
      href: '#eventos',
    },
  ]

  const legalLinks = [
    {
      label: t('footer.legal.notice'),
      path: getLegalPath(
        currentLanguage,
        'notice'
      ),
    },
    {
      label: t('footer.legal.privacy'),
      path: getLegalPath(
        currentLanguage,
        'privacy'
      ),
    },
    {
      label: t('footer.legal.cookies'),
      path: getLegalPath(
        currentLanguage,
        'cookies'
      ),
    },
  ]

  return (
    <footer className="border-t border-[#c89b5c]/15 bg-transparent px-6 py-10 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.05fr_1.1fr_0.75fr_1fr] lg:gap-10">
          {/* Marca */}
          <div className="min-w-0">
            <p className="font-display max-w-sm text-3xl font-semibold leading-none tracking-[-0.035em] text-[#f5efe6] sm:text-4xl">
              {tavernInfo.name}
            </p>

            <p className="mt-4 max-w-xs text-sm leading-6 text-[#b8aa98]">
              {t('footer.slogan')}
            </p>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#d8cfc2] transition hover:text-[#c89b5c]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c89b5c]/30 text-[#c89b5c]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </span>

              <span>
                {
                  tavernInfo.instagram
                    .username
                }
              </span>
            </a>
          </div>

          {/* Visítanos */}
          <div className="min-w-0">
            <h2 className="section-eyebrow">
              {t('footer.visitTitle')}
            </h2>

            <address className="mt-4 not-italic">
              <p className="max-w-sm text-base leading-7 text-[#f5efe6]">
                {tavernInfo.address.full}
              </p>

              <div className="mt-4 space-y-1 text-sm leading-6 text-[#b8aa98]">
                <p>
                  {hours.weekday}
                </p>

                <p>
                  {hours.saturday}
                </p>

                <p>
                  {hours.sunday}
                </p>
              </div>

              <div className="mt-5 flex flex-col items-start gap-2.5">
                {phone &&
                  (phoneHref ? (
                    <a
                      href={`tel:${phoneHref}`}
                      className="text-sm text-[#d8cfc2] transition hover:text-[#c89b5c]"
                    >
                      {phone}
                    </a>
                  ) : (
                    <span className="text-sm text-[#d8cfc2]">
                      {phone}
                    </span>
                  ))}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="break-all text-sm text-[#d8cfc2] transition hover:text-[#c89b5c]"
                  >
                    {email}
                  </a>
                )}

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#c89b5c] transition hover:text-[#d7ad70]"
                >
                  {t(
                    'footer.directions'
                  )}

                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </address>
          </div>

          {/* Navegación */}
          <div className="min-w-0">
            <h2 className="section-eyebrow">
              {t(
                'footer.exploreTitle'
              )}
            </h2>

            <nav
              className="mt-4"
              aria-label={t(
                'footer.exploreTitle'
              )}
            >
              <ul className="space-y-2.5">
                {navigationLinks.map(
                  (link) => (
                    <li key={link.href}>
                      <a
                        href={`/${currentLanguage}${link.href}`}
                        className="text-sm text-[#d8cfc2] transition hover:text-[#c89b5c]"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>

          {/* Legal y desarrollo */}
          <div className="min-w-0">
            <h2 className="section-eyebrow">
              {t(
                'footer.legalDevelopmentTitle'
              )}
            </h2>

            <nav
              className="mt-4"
              aria-label={t(
                'footer.legal.ariaLabel'
              )}
            >
              <ul className="space-y-2.5">
                {legalLinks.map(
                  (link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-sm text-[#d8cfc2] transition hover:text-[#c89b5c]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>

            <div className="mt-6 border-t border-[#c89b5c]/15 pt-5">
              <div className="flex items-center gap-3">
                <p className="text-[9px] font-semibold uppercase leading-4 tracking-[0.2em] text-[#b8aa98]">
                  {t(
                    'footer.developmentLabel'
                  )}
                </p>

                <img
                  src="/images/brand/simona-development-logo-footer.png"
                  alt="Simona Simion"
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-auto shrink-0 opacity-80 transition duration-300 hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-9 border-t border-[#c89b5c]/15 pt-5 text-xs leading-5 text-[#b8aa98]">
          <p>
            © {currentYear}{' '}
            {tavernInfo.name}.{' '}
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer