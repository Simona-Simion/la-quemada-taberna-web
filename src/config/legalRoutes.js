export const legalSlugs = {
  es: {
    notice: 'aviso-legal',
    privacy: 'privacidad',
    cookies: 'cookies',
  },
  en: {
    notice: 'legal-notice',
    privacy: 'privacy',
    cookies: 'cookies',
  },
  fr: {
    notice: 'mentions-legales',
    privacy: 'confidentialite',
    cookies: 'cookies',
  },
}

export function getLegalPath(language, page) {
  const safeLanguage = legalSlugs[language] ? language : 'es'
  const slug = legalSlugs[safeLanguage][page]

  return `/${safeLanguage}/${slug}`
}

export function resolveLegalPage(language, slug) {
  const routes = legalSlugs[language]

  if (!routes) {
    return null
  }

  return Object.entries(routes).find(([, routeSlug]) => routeSlug === slug)?.[0] ?? null
}
