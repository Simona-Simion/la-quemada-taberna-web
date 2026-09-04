import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { tavernInfo } from '../data/tavernInfo'
import { supportedLanguages } from '../i18n'
import { getTavernInfo } from '../sanity/menuService'

function Location() {
  const { t, i18n } = useTranslation()

  const currentLanguage =
    supportedLanguages.includes(
      i18n.resolvedLanguage
    )
      ? i18n.resolvedLanguage
      : 'es'

  const [remoteInfo, setRemoteInfo] =
    useState(null)

  const [currentTime, setCurrentTime] =
    useState(() => Date.now())

  useEffect(() => {
    let isCancelled = false

    async function loadTavernInfo() {
      try {
        const information =
          await getTavernInfo(currentLanguage)

        if (!isCancelled) {
          setRemoteInfo(information)
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(
            'No se pudo cargar la información de la taberna:',
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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(Date.now())
    }, 60000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const hours = {
    weekday:
      remoteInfo?.hours?.weekday?.label?.trim() ||
      t('visit.hours.weekday'),

    saturday:
      remoteInfo?.hours?.saturday?.label?.trim() ||
      t('visit.hours.saturday'),

    sunday:
      remoteInfo?.hours?.sunday?.label?.trim() ||
      t('visit.hours.sunday'),
 }

  const noticeData =
    remoteInfo?.temporaryNotice

  const noticeStartTime =
    noticeData?.startAt
      ? Date.parse(noticeData.startAt)
      : null

  const noticeEndTime =
    noticeData?.endAt
      ? Date.parse(noticeData.endAt)
      : null

  const isNoticeInDateRange =
    (!noticeStartTime ||
      currentTime >= noticeStartTime) &&
    (!noticeEndTime ||
      currentTime <= noticeEndTime)

  const temporaryNotice =
    noticeData?.isVisible &&
    isNoticeInDateRange &&
    noticeData?.message?.trim()
      ? noticeData.message.trim()
      : ''

  const noticeActionLabel =
    temporaryNotice
      ? noticeData?.actionLabel?.trim() || ''
      : ''

  const noticeActionUrl =
    temporaryNotice
      ? noticeData?.actionUrl?.trim() || ''
      : ''

  const email =
    remoteInfo?.contact?.email?.trim() ||
    tavernInfo.contact.email

  const phone =
    remoteInfo?.contact?.phone?.trim() ||
    tavernInfo.contact.phone

  const phoneHref = phone
    ? phone.replace(/[^\d+]/g, '')
    : ''

  const whatsapp =
    remoteInfo?.contact?.whatsapp?.trim() ||
    tavernInfo.contact.whatsapp

  const instagramUrl =
    remoteInfo?.contact?.instagramUrl?.trim() ||
    tavernInfo.instagram.url

  const googleMapsUrl =
    remoteInfo?.contact?.googleMapsUrl?.trim() ||
    tavernInfo.googleMaps.url

  return (
    <section className="relative isolate overflow-hidden bg-[#18130f] py-24 md:py-28">
      {/* Fondo cálido y discreto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(
              120deg,
              #18130f 0%,
              #211812 54%,
              #18130f 100%
            )
          `,
        }}
      />

      <div
        id="visitanos"
        className="
          relative z-10 mx-auto w-full max-w-[1600px]
          scroll-mt-20 px-5
          sm:px-6 md:scroll-mt-24
          lg:px-8
        "
      >
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          {/* Columna izquierda */}
          <div className="max-w-2xl">
            <h2 className="section-eyebrow">
              {t('visit.eyebrow')}
            </h2>

            {/* Dirección decorativa */}
            <div
              aria-hidden="true"
              className="mt-7 select-none"
            >
              <p
                className="
                  font-display text-[clamp(3.6rem,6.5vw,6.7rem)]
                  font-semibold uppercase leading-[0.78]
                  tracking-[-0.055em]
                "
                style={{
                  color:
                    'rgba(200, 155, 92, 0.035)',
                  WebkitTextStroke:
                    '1.2px rgba(200, 155, 92, 0.34)',
                }}
              >
                <span className="block">
                  Antonio

                </span>

                <span className="block">

                  Agustín 24
                </span>
              </p>
            </div>

            {/* Texto principal */}
            <p className="font-display mt-9 max-w-xl text-[clamp(1.8rem,3vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-[#f5efe6]">
              {t('visit.description')}
            </p>
          </div>

          {/* Columna derecha */}
          <div>
            {temporaryNotice && (
              <div className="mb-9 border-l-2 border-[#c89b5c] bg-[#211b16] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c89b5c]">
                  {t('visit.noticeLabel', {
                    defaultValue: 'Aviso',
                  })}
                </p>

                <p className="mt-3 text-base leading-7 text-[#f5efe6]">
                  {temporaryNotice}
                </p>

                {noticeActionLabel &&
                  noticeActionUrl && (
                    <a
                      href={noticeActionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-[#c89b5c]/45 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#c89b5c] transition hover:border-[#c89b5c] hover:bg-[#c89b5c] hover:text-[#18130f]"
                    >
                      {noticeActionLabel}
                    </a>
                  )}
              </div>
            )}

            {/* Información principal */}
            <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {/* Dirección */}
              <div className=" pt-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c89b5c]">
                  {t('visit.addressLabel')}
                </p>

                <p className="mt-4 max-w-md text-balance text-base leading-7 text-[#f5efe6]">
                  {tavernInfo.address.full}
                </p>
              </div>

              {/* Horario */}
              <div className="pt-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c89b5c]">
                  {t('visit.hoursLabel')}
                </p>

                <div className="mt-4 space-y-2 text-base leading-7 text-[#f5efe6]">
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
              </div>

              {/* Contacto */}
              <div className="pt-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c89b5c]">
                  {t('visit.contactLabel')}
                </p>

                <div className="mt-5 flex flex-col items-start gap-4">
                  {phone && (
                    phoneHref ? (
                      <a
                        href={`tel:${phoneHref}`}
                        className="group inline-flex items-center gap-3 text-[#f5efe6] transition hover:text-[#c89b5c]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c89b5c]/35 text-[#c89b5c] transition group-hover:border-[#c89b5c]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4.5 w-4.5"
                            aria-hidden="true"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
                          </svg>
                        </span>

                        <span className="text-base">
                          {phone}
                        </span>
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-3 text-[#f5efe6]">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c89b5c]/35 text-[#c89b5c]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4.5 w-4.5"
                            aria-hidden="true"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
                          </svg>
                        </span>

                        <span className="text-base">
                          {phone}
                        </span>
                      </div>
                    )
                  )}

                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="group inline-flex min-w-0 items-center gap-3 text-[#f5efe6] transition hover:text-[#c89b5c]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c89b5c]/35 text-[#c89b5c] transition group-hover:border-[#c89b5c]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4.5 w-4.5"
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
                      </span>

                      <span className="break-all text-base">
                        {email}
                      </span>
                    </a>
                  )}

                  {whatsapp && (
                    <a
                      href={`https://wa.me/${whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-3 text-sm font-semibold text-[#c89b5c] transition hover:text-[#d7ad70]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c89b5c]/35">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4.5 w-4.5"
                          aria-hidden="true"
                        >
                          <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.5-4.7a8.5 8.5 0 1 1 16-4.3Z" />
                          <path d="M8.2 7.7c.4 3.8 2.4 5.8 6.1 6.2" />
                        </svg>
                      </span>

                      <span>
                        {t('visit.whatsappAction')}
                      </span>
                    </a>
                  )}
                </div>
              </div>

              {/* Instagram */}
              <div className=" pt-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c89b5c]">
                  {t(
                    'visit.instagramLabel'
                  )}
                </p>

                <a
                  href={
                    instagramUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="group mt-4 inline-flex items-center gap-3 text-[#f5efe6] transition hover:text-[#c89b5c]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c89b5c]/40 text-[#c89b5c] transition group-hover:border-[#c89b5c] group-hover:bg-[#c89b5c] group-hover:text-[#18130f]">
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

                  <span className="flex min-w-0 flex-col">
                    <span className="text-base font-semibold">
                      {t(
                        'visit.instagramAction'
                      )}
                    </span>

                    <span className="mt-1 break-all text-sm text-[#b8aa98] transition group-hover:text-[#c89b5c]">
                      {
                        tavernInfo.instagram
                          .username
                      }
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* Cómo llegar */}
            <div className="mt-11 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-start sm:gap-9">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c89b5c]/40 text-[#c89b5c]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c89b5c]">
                    {t('visit.directions.eyebrow')}
                  </p>

                  <p className="mt-2 max-w-md text-balance leading-6 text-[#b8aa98] sm:text-base sm:leading-7">
                    {t('visit.directions.description')}
                  </p>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-full bg-[#c89b5c] px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#18130f] transition hover:bg-[#d7ad70] sm:w-fit"
              >
                {t('visit.directions.buttonText')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Location