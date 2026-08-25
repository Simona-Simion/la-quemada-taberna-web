import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { tavernInfo } from '../data/tavernInfo'

function Hero() {
  const [activeImageIndex, setActiveImageIndex] =
    useState(0)

  const { t, i18n } = useTranslation()

  const currentLanguage =
    i18n.resolvedLanguage?.split('-')[0] ?? 'es'

  const isEnglish = currentLanguage === 'en'

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImageIndex((currentIndex) =>
        currentIndex ===
          tavernInfo.hero.images.length - 1
          ? 0
          : currentIndex + 1
      )
    }, 5500)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section
      id="inicio"
      className="relative w-full max-w-full min-h-svh overflow-hidden bg-[#18130f]"
    >
      {/* Imágenes del carrusel */}
      {tavernInfo.hero.images.map(
        (image, index) => (
          <picture
            key={image.desktopSrc}
            className={`absolute inset-0 block h-full w-full max-w-full overflow-hidden transition-opacity duration-1000 ${index === activeImageIndex
                ? 'opacity-80'
                : 'pointer-events-none opacity-0'
              }`}
          >
            <source
              media="(max-width: 767px)"
              srcSet={image.mobileSrc}
            />

            <img
              src={image.desktopSrc}
              alt={image.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
              draggable="false"
              className={`absolute inset-0 h-full w-full max-w-full object-cover object-center transition-transform duration-1000 ${index === activeImageIndex
                  ? 'scale-100 md:scale-105'
                  : 'scale-100'
                }`}
            />
          </picture>
        )
      )}

      {/* Capas para mantener el texto legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/25"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40"
      />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex min-h-svh w-full items-center justify-center px-5 pb-4 pt-56 text-center sm:px-8 sm:pb-16 sm:pt-48 md:pb-40 md:pt-24">
        <div className="w-full max-w-375">
          <h1
            className={`font-display mx-auto text-balance font-semibold leading-[0.92] tracking-[-0.04em] text-[#eadfce] ${isEnglish
              ? 'max-w-312 whitespace-pre-line text-[clamp(3.2rem,5.8vw,6.4rem)]'
              : 'max-w-380 text-[clamp(3rem,12vw,4rem)] sm:text-[clamp(3.5rem,6.5vw,7rem)] xl:whitespace-nowrap'
              }`}
          >
            {t('hero.title')}
          </h1>

          <p className="font-body mx-auto mt-7 max-w-4xl text-lg leading-8 text-[#e2d7c8] sm:text-xl md:text-2xl md:leading-9">
            {t('hero.description')}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="#visitanos"
              className="rounded-full bg-[#c89b5c] px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#18130f] transition hover:bg-[#d7ad70]"
            >
              {t('hero.directions')}
            </a>

            <a
              href="#carta"
              className="rounded-full border border-[#c89b5c]/70 px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#c89b5c] transition hover:bg-[#c89b5c] hover:text-[#18130f]"
            >
              {t('hero.menu')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero