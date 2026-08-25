import {menuEdition} from './menuEdition'
import {barSelection} from './barSelection'
import {barGallery} from './barGallery'
import {tavernInfo} from './tavernInfo'
import {seoSettings} from './seoSettings'

import {localizedString} from './objects/localizedString'
import {localizedText} from './objects/localizedText'
import {barSelectionItem} from './objects/barSelectionItem'
import {barGalleryImage} from './objects/barGalleryImage'
import {barGalleryCard} from './objects/barGalleryCard'

export const schemaTypes = [
  localizedString,
  localizedText,
  barSelectionItem,
  barGalleryImage,
  barGalleryCard,

  menuEdition,
  barSelection,
  barGallery,
  tavernInfo,
  seoSettings,
]