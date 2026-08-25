import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { getLegalPath } from '../config/legalRoutes'
import { tavernInfo } from '../data/tavernInfo'
import { supportedLanguages } from '../i18n'
import { getTavernInfo } from '../sanity/menuService'

function EventsSection() {
  const { t, i18n } = useTranslation()

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
            'No se pudo cargar el contacto desde Sanity:',
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

  const email =
    remoteInfo?.contact?.email?.trim() ||
    tavernInfo.contact.email

  const whatsapp =
    remoteInfo?.contact?.whatsapp?.trim() ||
    tavernInfo.contact.whatsapp

  const hasEmail = Boolean(email)
  const hasWhatsapp = Boolean(whatsapp)

  const emailUrl = hasEmail
    ? `mailto:${email}?subject=${encodeURIComponent(
        t('events.emailSubject')
      )}`
    : ''

  const whatsappUrl = hasWhatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        t('events.whatsappMessage')
      )}`
    : ''

  return (
    <section className="overflow-hidden bg-[#201711] py-20 md:py-24">
      <div
        id="eventos"
        className="w-full scroll-mt-20 px-4 sm:px-6 md:scroll-mt-24 lg:px-8"
      >
        <div className="overflow-hidden border-y border-[#c89b5c]/20 bg-[#201711] shadow-[0_32px_100px_rgba(0,0,0,0.28)]">
          <div className="grid lg:min-h-[38rem] lg:grid-cols-[1.18fr_0.82fr]">
            {/* Fotografía */}
            <div className="relative min-h-[21rem] overflow-hidden bg-[#16110d] sm:min-h-[27rem] lg:min-h-full">
              {/* Fondo de relleno para escritorio */}
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden scale-110 bg-cover bg-center opacity-30 blur-lg lg:block"
                style={{
                  backgroundImage:
                    "url('/images/eventos/eventos-la-quemada.webp')",
                }}
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 hidden bg-black/25 lg:block"
              />

              {/* Fotografía principal */}
              <img
                src="/images/eventos/eventos-la-quemada.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 z-1 h-full w-full object-cover lg:object-contain"
              />

              {/* Transición hacia el contenido */}
              <div className="absolute inset-0 z-[2] bg-linear-to-t from-[#1d1712] via-transparent to-black/10 lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-[#1d1712]/85" />

              {/* Palabra decorativa */}
              <p
                aria-hidden="true"
                className="font-display pointer-events-none absolute bottom-4 left-5 z-[3] select-none whitespace-nowrap text-[clamp(3rem,14vw,5rem)] font-semibold leading-none tracking-[0.02em] text-transparent sm:bottom-6 sm:left-7 lg:bottom-8 lg:left-9 lg:text-[clamp(6rem,8vw,9rem)]"
                style={{
                  WebkitTextStroke:
                    '1px rgba(245, 239, 230, 0.28)',
                }}
              >
                {t(
                  'events.backgroundWord'
                )}
              </p>
            </div>

            {/* Contenido */}
            <div className="relative flex flex-col justify-center bg-[#18130f]/9 px-6 py-11 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
              <div
                aria-hidden="true"
                className="absolute inset-y-12 left-0 hidden w-px bg-linear-to-b from-transparent via-[#c89b5c]/50 to-transparent lg:block"
              />

              <p className="section-eyebrow">
                {t('events.eyebrow')}
              </p>

              <h2 className="section-title mt-7 whitespace-pre-line">
                {t('events.title')}
              </h2>

              <p className="section-text mt-7">
                {t(
                  'events.description'
                )}
              </p>

              <div className="mt-9 border-l-2 border-[#c89b5c] bg-[#211b16] px-5 py-5 sm:px-6">
                <p className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-[1] tracking-[-0.03em] text-[#f5efe6]">
                  {t('events.note')}
                </p>
              </div>

              {(hasEmail ||
                hasWhatsapp) && (
                <div className="mt-9">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {hasEmail && (
                      <a
                        href={emailUrl}
                        className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-[#c89b5c]/40 px-5 py-3 text-[#f5efe6] transition hover:border-[#c89b5c] hover:bg-[#c89b5c] hover:text-[#18130f]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          className="h-5 w-5 shrink-0"
                          aria-hidden="true"
                        >
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                          />

                          <path d="m4 7 8 6 8-6" />
                        </svg>

                        <span className="text-center text-xs font-semibold uppercase tracking-[0.14em]">
                          {t(
                            'events.emailAction'
                          )}
                        </span>
                      </a>
                    )}

                    {hasWhatsapp && (
                      <a
                        href={
                          whatsappUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#c89b5c] px-5 py-3 text-[#18130f] transition hover:bg-[#d7ad70]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.5-4.7a8.5 8.5 0 1 1 16-4.3Z" />

                          <path d="M8.2 7.7c.4 3.8 2.4 5.8 6.1 6.2" />

                          <path d="m8.2 7.7 1.5-.6 1.1 2-1 1" />

                          <path d="m14.3 13.9 1-1 2 1.1-.6 1.5" />
                        </svg>

                        <span className="text-center text-xs font-semibold uppercase tracking-[0.14em]">
                          {t(
                            'events.whatsappAction'
                          )}
                        </span>
                      </a>
                    )}
                  </div>

                  <p className="mt-6 text-xs leading-5 text-[#9f9282]">
                    {t(
                      'events.privacyNotice'
                    )}{' '}

                    <Link
                      to={getLegalPath(
                        currentLanguage,
                        'privacy'
                      )}
                      className="underline decoration-[#c89b5c]/50 underline-offset-4 transition hover:text-[#c89b5c]"
                    >
                      {t(
                        'events.privacyLink'
                      )}
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsSection