import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { menuInfo } from '../data/menu'
import { getActiveMenu } from '../sanity/menuService'

function MenuImageCard({
  pdf,
  variant = 'primary',
}) {
  const positionClass =
    variant === 'primary'
      ? `
        z-20 w-[92%] min-h-[22rem]
        sm:w-[88%] sm:min-h-[24rem]
        lg:absolute lg:left-0 lg:top-0 lg:z-30
        lg:h-[25rem] lg:w-[76%]
      `
      : `
        z-10 -mt-14 ml-auto mr-2 w-[84%] min-h-[20rem]
        sm:-mt-16 sm:mr-4 sm:w-[78%] sm:min-h-[22rem]
        lg:absolute lg:right-0 lg:top-80 lg:z-20
        lg:mt-0 lg:h-72 lg:w-[62%]
      `

  return (
    <article
      className={`group relative overflow-hidden border border-[#c89b5c]/20 bg-[#211b16] shadow-2xl ${positionClass}`}
    >
      <picture className="absolute inset-0 block">
        <source
          media="(max-width: 767px)"
          srcSet={pdf.image.mobile}
        />

        <img
          src={pdf.image.desktop}
          alt={pdf.title || pdf.badge}
          loading="lazy"
          decoding="async"
          draggable="false"
          className="h-full w-full object-cover object-center opacity-70 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-85"
        />
      </picture>

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c89b5c]">
          {pdf.badge}
        </p>

        {pdf.title && (
          <h3 className="card-title mt-3 max-w-xs [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]">
            {pdf.title}
          </h3>
        )}

        <a
          href={pdf.url}
          target="_blank"
          rel="noreferrer"
          className="relative z-40 mt-6 inline-flex w-fit whitespace-nowrap rounded-full bg-[#c89b5c] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.11em] text-[#18130f] transition hover:bg-[#d7ad70] sm:px-5 sm:text-xs sm:tracking-[0.14em]"
        >
          {pdf.buttonText}
        </a>
      </div>
    </article>
  )
}

function MenuSection() {
  const { t, i18n } = useTranslation()

  const currentLanguage =
    i18n.resolvedLanguage || 'es'

  const localFoodMenu = menuInfo.pdfs[0]
  const localWineMenu = menuInfo.pdfs[1]

  const [foodMenuUrl, setFoodMenuUrl] =
    useState(localFoodMenu.url)

  const [wineMenuUrl, setWineMenuUrl] =
    useState(localWineMenu.url)

  useEffect(() => {
    async function loadActiveMenus() {
      try {
        const [foodMenuData, wineMenuData] =
          await Promise.all([
            getActiveMenu(
              'food',
              currentLanguage
            ),
            getActiveMenu(
              'wine',
              currentLanguage
            ),
          ])

        if (foodMenuData?.pdfUrl) {
          setFoodMenuUrl(foodMenuData.pdfUrl)
        }

        if (wineMenuData?.pdfUrl) {
          setWineMenuUrl(wineMenuData.pdfUrl)
        }
      } catch (error) {
        console.error(
          'Error al consultar las cartas en Sanity:',
          error
        )
      }
    }

    loadActiveMenus()
  }, [currentLanguage])

  const foodMenu = {
    ...localFoodMenu,
    url: foodMenuUrl,
    badge: t('menu.food.badge'),
    subtitle: t('menu.food.subtitle'),
    buttonText: t('menu.food.buttonText'),
  }

  const wineMenu = {
    ...localWineMenu,
    url: wineMenuUrl,
    badge: t('menu.wine.badge'),
    subtitle: t('menu.wine.subtitle'),
    buttonText: t('menu.wine.buttonText'),
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#18130f] px-6 pb-28 pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              #18130f 0%,
              #201711 52%,
              #18130f 100%
            )
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          zIndex: 1,
          backgroundImage:
            "url('/images/decorative/menu-symbols-mobile.svg')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          zIndex: 1,
          backgroundImage:
            "url('/images/decorative/menu-symbols-desktop.svg')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#c89b5c]/20 to-transparent"
        style={{ zIndex: 2 }}
      />

      <div
        id="carta"
        className="relative z-10 mx-auto grid max-w-6xl scroll-mt-20 gap-12 md:scroll-mt-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center"
      >
        <div className="order-1 lg:order-2">
          <p className="section-eyebrow">
            {t('menu.eyebrow')}
          </p>

          <h2 className="section-title mt-6 max-w-2xl whitespace-pre-line">
            {t('menu.title')}
          </h2>

          <p className="section-text mt-7 max-w-xl">
            {t('menu.description')}
          </p>
        </div>

        <div className="relative isolate order-2 pb-5 sm:pb-8 lg:order-1 lg:row-span-3 lg:min-h-152 lg:pb-0">
          {foodMenu && (
            <MenuImageCard
              pdf={foodMenu}
              variant="primary"
            />
          )}

          {wineMenu && (
            <MenuImageCard
              pdf={wineMenu}
              variant="secondary"
            />
          )}
        </div>

        <div className="relative order-3 border-l-2 border-[#c89b5c] bg-[#211b16]/95 px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-[2px] lg:order-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c89b5c]">
            {t('menu.suggestions.eyebrow')}
          </p>

          <h3 className="card-title mt-4">
            {t('menu.suggestions.title')}
          </h3>

          <p className="mt-5 text-base leading-8 text-[#d8cfc2]">
            {t('menu.suggestions.description')}
          </p>

          <p className="mt-6 border-t border-[#c89b5c]/20 pt-5 text-sm leading-7 text-[#b8aa98]">
            {t('menu.suggestions.note')}
          </p>
        </div>

        <p className="order-4 max-w-xl text-sm leading-7 text-[#b8aa98] lg:order-4">
          {t('menu.note')}
        </p>
      </div>
    </section>
  )
}

export default MenuSection
