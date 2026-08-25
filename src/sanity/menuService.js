import { sanityClient } from './client'
import {
  ACTIVE_MENU_QUERY,
  BAR_GALLERY_QUERY,
  BAR_SELECTION_QUERY,
  SEO_SETTINGS_QUERY,
  TAVERN_INFO_QUERY,
} from './queries'

const supportedMenuLanguages = [
  'es',
  'en',
  'fr',
]

function normalizeLanguage(language = 'es') {
  const normalizedLanguage =
    language?.split('-')[0]

  return supportedMenuLanguages.includes(
    normalizedLanguage
  )
    ? normalizedLanguage
    : 'es'
}

export async function getActiveMenu(
  menuType,
  language = 'es'
) {
  const safeLanguage =
    normalizeLanguage(language)

  return sanityClient.fetch(
    ACTIVE_MENU_QUERY,
    {
      menuType,
      language: safeLanguage,
    }
  )
}

export async function getBarSelection(
  language = 'es'
) {
  const safeLanguage =
    normalizeLanguage(language)

  const selection = await sanityClient.fetch(
    BAR_SELECTION_QUERY,
    {
      language: safeLanguage,
    }
  )

  return {
    internalName:
      selection?.internalName ?? '',

    barItems:
      selection?.barItems ?? [],

    productItems:
      selection?.productItems ?? [],

    wineItems:
      selection?.wineItems ?? [],
  }
}

export async function getTavernInfo(
  language = 'es'
) {
  const safeLanguage =
    normalizeLanguage(language)

  return sanityClient.fetch(
    TAVERN_INFO_QUERY,
    {
      language: safeLanguage,
    }
  )
}

export async function getBarGallery(
  language = 'es'
) {
  const safeLanguage =
    normalizeLanguage(language)

  const gallery = await sanityClient.fetch(
    BAR_GALLERY_QUERY,
    {
      language: safeLanguage,
    }
  )

  if (!gallery) {
    return null
  }

  return {
    internalName:
      gallery.internalName ?? '',

    cards:
      gallery.cards ?? [],
  }
}

export async function getSeoSettings(
  language = 'es'
) {
  const safeLanguage =
    normalizeLanguage(language)

  return sanityClient.fetch(
    SEO_SETTINGS_QUERY,
    {
      language: safeLanguage,
    }
  )
}