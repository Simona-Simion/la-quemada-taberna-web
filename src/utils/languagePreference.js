const LANGUAGE_STORAGE_KEY = 'la-quemada-language'

export function getSavedLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  } catch {
    return null
  }
}

export function saveLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    // La navegación por idioma sigue funcionando aunque el almacenamiento esté bloqueado.
  }
}

export const languageStorageKey = LANGUAGE_STORAGE_KEY
