
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { supportedLanguages } from '../i18n'
import {
  getSeoSettings,
  getTavernInfo,
} from '../sanity/menuService'

import {
  getLegalPath,
  resolveLegalPage,
} from '../config/legalRoutes'

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

const legalSeo = {
  es: {
    notice: {
      title: 'Aviso legal | La Quemada Taberna',
      description:
        'Consulta el aviso legal de La Quemada Taberna y la información relativa al titular y uso del sitio web.',
    },
    privacy: {
      title: 'Política de privacidad | La Quemada Taberna',
      description:
        'Consulta la política de privacidad de La Quemada Taberna y cómo se gestionan los datos personales en este sitio web.',
    },
    cookies: {
      title: 'Política de cookies | La Quemada Taberna',
      description:
        'Consulta la política de cookies de La Quemada Taberna y la información sobre el uso de almacenamiento y tecnologías similares.',
    },
  },

  en: {
    notice: {
      title: 'Legal notice | La Quemada Taberna',
      description:
        'Read the legal notice for La Quemada Taberna, including information about the website owner and terms of use.',
    },
    privacy: {
      title: 'Privacy policy | La Quemada Taberna',
      description:
        'Read the privacy policy for La Quemada Taberna and how personal data is handled on this website.',
    },
    cookies: {
      title: 'Cookie policy | La Quemada Taberna',
      description:
        'Read the cookie policy for La Quemada Taberna and information about storage and similar technologies used on this website.',
    },
  },

  fr: {
    notice: {
      title: 'Mentions légales | La Quemada Taberna',
      description:
        'Consultez les mentions légales de La Quemada Taberna ainsi que les informations relatives au propriétaire et à l’utilisation du site.',
    },
    privacy: {
      title: 'Politique de confidentialité | La Quemada Taberna',
      description:
        'Consultez la politique de confidentialité de La Quemada Taberna et la manière dont les données personnelles sont traitées sur ce site.',
    },
    cookies: {
      title: 'Politique de cookies | La Quemada Taberna',
      description:
        'Consultez la politique de cookies de La Quemada Taberna et les informations sur le stockage et les technologies similaires utilisées sur ce site.',
    },
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

function setAlternateLinks(links) {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((element) => element.remove())

  links.forEach(({ language, url }) => {
    const link = document.createElement('link')

    link.setAttribute('rel', 'alternate')
    link.setAttribute('hreflang', language)
    link.setAttribute('href', url)

    document.head.appendChild(link)
  })
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



      const siteName =
        remoteSeo?.siteName?.trim() ||
        'La Quemada Taberna'

      const baseUrl =
        remoteSeo?.canonicalUrl?.trim() ||
        window.location.origin

      const normalizedBaseUrl =
        baseUrl.replace(/\/+$/, '')

      const currentPath =
        window.location.pathname

      const pathParts =
        currentPath
          .split('/')
          .filter(Boolean)

      const currentLegalSlug =
        pathParts.length === 2
          ? pathParts[1]
          : null

      const currentLegalPage =
        currentLegalSlug
          ? resolveLegalPage(
            currentLanguage,
            currentLegalSlug
          )
          : null


      const currentLegalSeo =
        currentLegalPage
          ? legalSeo[currentLanguage]?.[currentLegalPage]
          : null

      const title =
        currentLegalSeo?.title ||
        remoteSeo?.title?.trim() ||
        fallback.title

      const description =
        currentLegalSeo?.description ||
        remoteSeo?.description?.trim() ||
        fallback.description
      const canonicalPath =
        currentLegalPage
          ? getLegalPath(
            currentLanguage,
            currentLegalPage
          )
          : `/${currentLanguage}`

      const canonicalUrl =
        `${normalizedBaseUrl}${canonicalPath}`

      const alternateLinks =
        supportedLanguages.map(
          (language) => ({
            language,
            url: currentLegalPage
              ? `${normalizedBaseUrl}${getLegalPath(
                language,
                currentLegalPage
              )}`
              : `${normalizedBaseUrl}/${language}`,
          })
        )

      alternateLinks.push({
        language: 'x-default',
        url: `${normalizedBaseUrl}/es`,
      })

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
      setAlternateLinks(
        alternateLinks
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