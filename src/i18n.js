import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from './locales/es'
import en from './locales/en'
import fr from './locales/fr'
import { getSavedLanguage } from './utils/languagePreference'

export const supportedLanguages = ['es', 'en', 'fr']

const urlLanguage = window.location.pathname.split('/')[1]
const savedLanguage = getSavedLanguage()

const initialLanguage = supportedLanguages.includes(urlLanguage)
  ? urlLanguage
  : supportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : 'es'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      fr: { translation: fr },
    },

    lng: initialLanguage,
    fallbackLng: 'es',
    supportedLngs: supportedLanguages,

    interpolation: {
      escapeValue: false,
    },

    returnNull: false,
  })

export default i18n