
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { supportedLanguages } from '../i18n'
import {
  getSeoSettings,
  getTavernInfo,
} from '../sanity/menuService'

const fallbackSeo = {
  es: {
    title:
      'La Quemada Taberna | Taberna en el Casco Antiguo de Zaragoza',
    description:
      'Taberna de barrio en el Casco Antiguo de Zaragoza, con producto, vinos y cocina de tradición en C. de Antonio Agustín, 24.',
    imageAlt:
      'Interior de La Quemada Taberna en Zaragoza',
  },

  en: {
    title:
      'La Quemada Taberna | Traditional Tavern in Zaragoza Old Town',
    description:
      'Neighbourhood tavern in Zaragoza Old Town, serving traditional food, quality products and wines at C. de Antonio Agustín, 24.',
    imageAlt:
      'Interior of La Quemada Taberna in Zaragoza',
  },

  fr: {
    title:
      'La Quemada Taberna | Taverne traditionnelle dans le centre historique de Saragosse',
    description:
      'Taverne traditionnelle au cœur du centre historique de Saragosse, avec cuisine de tradition, produits de qualité et une belle sélection de vins, C. de Antonio Agustín, 24.',
    imageAlt:
      'Intérieur de La Quemada Taberna à Saragosse',
  },
}

const localeMap = {
  es: 'es_ES',
  en: 'en_GB',
  fr: 'fr_FR',
}

function setMeta(property, content, useProperty = false) {
  if (!content) {
    return
  }

  const attribute =
    useProperty
      ? 'property'
      : 'name'

  let element =
    document.head.querySelector(
      `meta[${attribute}="${property}"]`
    )

  if (!element) {
    element =
      document.createElement('meta')

    element.setAttribute(
      attribute,
      property
    )

    document.head.appendChild(
      element
    )
  }

  element.setAttribute(
    'content',
    content
  )
}

function setCanonical(url) {
  if (!url) {
    return
  }

  let canonical =
    document.head.querySelector(
      'link[rel="canonical"]'
    )

  if (!canonical) {
    canonical =
      document.createElement('link')

    canonical.setAttribute(
      'rel',
      'canonical'
    )

    document.head.appendChild(
      canonical
    )
  }

  canonical.setAttribute(
    'href',
    url
  )
}

function Seo() {
  const { i18n } = useTranslation()

  const currentLanguage =
    supportedLanguages.includes(
      i18n.resolvedLanguage
    )
      ? i18n.resolvedLanguage
      : 'es'

  useEffect(() => {
    let isCancelled = false

    async function loadSeo() {
      const fallback =
        fallbackSeo[
        currentLanguage
        ]

      let remoteSeo = null
      let tavernInfo = null

      try {
        const [
          seoSettings,
          info,
        ] = await Promise.all([
          getSeoSettings(
            currentLanguage
          ),
          getTavernInfo(
            currentLanguage
          ),
        ])

        remoteSeo = seoSettings
        tavernInfo = info
      } catch (error) {
        console.error(
          'No se pudieron cargar los datos SEO desde Sanity:',
          error
        )
      }

      if (isCancelled) {
        return
      }

      const title =
        remoteSeo?.title?.trim() ||
        fallback.title

      const description =
        remoteSeo?.description?.trim() ||
        fallback.description

      const siteName =
        remoteSeo?.siteName?.trim() ||
        'La Quemada Taberna'

      const canonicalUrl =
        remoteSeo?.canonicalUrl?.trim() ||
        window.location.origin

      const socialImage =
        remoteSeo?.socialImage?.trim() ||
        `${window.location.origin}/images/seo/imagen-seo.jpg`

      const socialImageAlt =
        remoteSeo?.socialImageAlt?.trim() ||
        fallback.imageAlt

      document.documentElement.lang =
        currentLanguage

      document.title = title

      setMeta(
        'description',
        description
      )

      setCanonical(
        canonicalUrl
      )

      setMeta(
        'og:type',
        'website',
        true
      )

      setMeta(
        'og:site_name',
        siteName,
        true
      )

      setMeta(
        'og:title',
        title,
        true
      )

      setMeta(
        'og:description',
        description,
        true
      )

      setMeta(
        'og:url',
        canonicalUrl,
        true
      )

      setMeta(
        'og:image',
        socialImage,
        true
      )

      setMeta(
        'og:image:alt',
        socialImageAlt,
        true
      )

      setMeta(
        'og:locale',
        localeMap[
        currentLanguage
        ],
        true
      )

      setMeta(
        'twitter:card',
        'summary_large_image'
      )

      setMeta(
        'twitter:title',
        title
      )

      setMeta(
        'twitter:description',
        description
      )

      setMeta(
        'twitter:image',
        socialImage
      )

      const structuredData = {
        '@context':
          'https://schema.org',

        '@type':
          'BarOrPub',

        name:
          siteName,

        description,

        url:
          canonicalUrl,

        image:
          socialImage,

        address: {
          '@type':
            'PostalAddress',

          streetAddress:
            'C. de Antonio Agustín, 24',

          addressLocality:
            'Zaragoza',

          addressRegion:
            'Aragón',

          postalCode:
            '50002',

          addressCountry:
            'ES',
        },

        sameAs: [
          'https://www.instagram.com/laquemadataberna/',
        ],

        openingHoursSpecification: [
          ...(tavernInfo?.hours?.weekday?.opens &&
            tavernInfo?.hours?.weekday?.closes
            ? [
              {
                '@type':
                  'OpeningHoursSpecification',
                dayOfWeek: [
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                ],
                opens:
                  tavernInfo.hours.weekday.opens,
                closes:
                  tavernInfo.hours.weekday.closes,
              },
            ]
            : []),

          ...(tavernInfo?.hours?.saturday?.opens &&
            tavernInfo?.hours?.saturday?.closes
            ? [
              {
                '@type':
                  'OpeningHoursSpecification',
                dayOfWeek: [
                  'Saturday',
                ],
                opens:
                  tavernInfo.hours.saturday.opens,
                closes:
                  tavernInfo.hours.saturday.closes,
              },
            ]
            : []),
        ],
      }

      let script =
        document.getElementById(
          'la-quemada-structured-data'
        )

      if (!script) {
        script =
          document.createElement(
            'script'
          )

        script.id =
          'la-quemada-structured-data'

        script.type =
          'application/ld+json'

        document.head.appendChild(
          script
        )
      }

      script.textContent =
        JSON.stringify(
          structuredData
        )
    }

    loadSeo()

    return () => {
      isCancelled = true
    }
  }, [currentLanguage])

  return null
}

export default Seo