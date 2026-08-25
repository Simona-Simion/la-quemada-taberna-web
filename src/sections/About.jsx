import { useTranslation } from 'react-i18next'

import { tavernInfo } from '../data/tavernInfo'

function About() {
  const { t } = useTranslation()

  const paragraphs = t('about.paragraphs', {
    returnObjects: true,
  })

  const highlights = t('about.highlights', {
    returnObjects: true,
  })

  return (
    <section className="relative overflow-hidden bg-[#18130f] pb-12 pt-20 sm:pb-20 sm:pt-32 md:pb-28 md:pt-44 lg:pb-32">
      {/* Fondo móvil */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 md:hidden
          mask-[linear-gradient(to_bottom,transparent_0,black_7rem,black_100%)]
          -webkit-mask-[linear-gradient(to_bottom,transparent_0,black_7rem,black_100%)]
        "
      >
        {/* Copia desenfocada para rellenar toda la sección */}
        <img
          src="/images/about/puerta-quemada-mobile.webp"
          alt=""
          draggable="false"
          className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-35 blur-md"
        />

        {/* Ilustración completa, sin recortar */}
        <img
          src="/images/about/puerta-quemada-mobile.webp"
          alt=""
          draggable="false"
          className="absolute inset-x-0 top-0 h-auto w-full object-contain opacity-90"
        />

        {/* Capa para garantizar la lectura */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                180deg,
                rgba(24, 19, 15, 0.30) 0%,
                rgba(24, 19, 15, 0.48) 28%,
                rgba(24, 19, 15, 0.66) 58%,
                rgba(24, 19, 15, 0.92) 100%
              )
            `,
          }}
        />
      </div>

      {/* Fondo de tableta y escritorio */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 hidden md:block
          mask-[linear-gradient(to_bottom,transparent_0,black_8rem,black_100%)]
          -webkit-mask-[linear-gradient(to_bottom,transparent_0,black_8rem,black_100%)]
        "
      >
        <img
          src={tavernInfo.about.backgroundImage}
          alt=""
          draggable="false"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-85"
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                90deg,
                rgba(24, 19, 15, 0.20) 0%,
                rgba(24, 19, 15, 0.48) 22%,
                rgba(24, 19, 15, 0.72) 42%,
                rgba(24, 19, 15, 0.72) 58%,
                rgba(24, 19, 15, 0.48) 78%,
                rgba(24, 19, 15, 0.20) 100%
              ),
              linear-gradient(
                180deg,
                rgba(24, 19, 15, 0.12) 0%,
                rgba(24, 19, 15, 0.16) 65%,
                rgba(24, 19, 15, 0.68) 100%
              )
            `,
          }}
        />
      </div>

      {/* Transición con la siguiente sección */}
      <div className="absolute inset-x-0 bottom-0 z-[1] h-20 bg-linear-to-t from-[#18130f] to-transparent sm:h-32 lg:h-40" />

      {/* Contenido */}
      <div
        id="taberna"
        className="relative z-10 mx-auto max-w-[1500px] scroll-mt-20 px-5 sm:px-6 md:scroll-mt-24"
      >
        <div className="mx-auto max-w-none">
          <p className="section-eyebrow text-center [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
            {t('about.eyebrow')}
          </p>

          <h2 className="section-title mx-auto mt-4 max-w-5xl text-balance text-center [text-shadow:0_3px_20px_rgba(0,0,0,0.9)] sm:mt-5 xl:max-w-none xl:whitespace-nowrap">
            {t('about.title')}
          </h2>

          <div className="mx-auto mt-6 max-w-3xl space-y-4 sm:mt-8 sm:space-y-6 md:mt-10">
            {paragraphs.map((paragraph, index) => (
              <p
                key={`about-paragraph-${index}`}
                className="text-left text-[0.95rem] leading-7 text-[#d8cfc2] [text-shadow:0_2px_12px_rgba(0,0,0,0.95)] sm:text-base sm:leading-8 md:text-[clamp(1rem,1.4vw,1.125rem)] md:leading-[1.8]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:mt-8 sm:gap-3 md:mt-10">
            {highlights.map((highlight, index) => (
              <span
                key={`about-highlight-${index}`}
                className="border border-[#c89b5c]/60 bg-[#18130f]/35 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#c89b5c] backdrop-blur-[2px] sm:px-5 sm:py-3 sm:text-sm sm:tracking-[0.22em]"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About