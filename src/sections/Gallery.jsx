import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import { barCards } from '../data/gallery'
import {
  getBarGallery,
  getBarSelection,
} from '../sanity/menuService'

const cardTranslationKeys = {
  barra: 'bar',
  producto: 'product',
  bodega: 'wine',
}

const selectionFields = {
  barra: 'barItems',
  producto: 'productItems',
  bodega: 'wineItems',
}

function getCardSelection(selection, cardId) {
  const fieldName = selectionFields[cardId]

  return (selection?.[fieldName] ?? [])
    .map((item) => ({
      ...item,
      name: item?.name?.trim() ?? '',
    }))
    .filter((item) => item.name)
}

function SelectionPopover({
  cardId,
  translationKey,
  selection,
  status,
  isOpen,
}) {
  const { t } = useTranslation()

  const items = getCardSelection(
    selection,
    cardId
  )

  const titleId =
    `selection-title-${cardId}`

  return (
    <div
      id={`selection-${cardId}`}
      role="region"
      aria-labelledby={titleId}
      aria-hidden={!isOpen}
      className={`absolute bottom-24 left-6 right-6 z-40 max-w-full border border-[#c89b5c]/35 bg-[#18130f]/95 px-6 py-6 shadow-2xl backdrop-blur-md transition-all duration-200 ease-out md:left-8 md:right-8 ${isOpen
          ? 'visible translate-y-0 opacity-100'
          : 'pointer-events-none invisible translate-y-3 opacity-0'
        }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c89b5c]">
        {t('bar.selection.eyebrow')}
      </p>

      <h4
        id={titleId}
        className="font-display mt-2 text-2xl font-semibold text-[#f5efe6]"
      >
        {t(
          `bar.cards.${translationKey}.title`
        )}
      </h4>

      {status === 'loading' && (
        <p className="mt-5 text-sm leading-6 text-[#d8cfc2]">
          {t('bar.selection.loading')}
        </p>
      )}

      {status === 'error' && (
        <p className="mt-5 text-sm leading-6 text-[#d8cfc2]">
          {t('bar.selection.error')}
        </p>
      )}

      {status === 'success' &&
        items.length === 0 && (
          <p className="mt-5 text-sm leading-6 text-[#d8cfc2]">
            {t('bar.selection.empty')}
          </p>
        )}

      {status === 'success' &&
        items.length > 0 && (
          <>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
              {items.map((item) => (
                <li
                  key={item._key}
                  className="flex items-start gap-2 text-sm leading-5 text-[#f5efe6]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.75 h-1 w-1 shrink-0 rounded-full bg-[#c89b5c]"
                  />

                  <span>
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t border-[#c89b5c]/15 pt-4 text-xs leading-5 text-[#b8aa98]">
              {t(
                'bar.selection.availability'
              )}
            </p>
          </>
        )}
    </div>
  )
}

function Gallery() {
  const { t, i18n } = useTranslation()

  const openCardContainerRef = useRef(null)

  const [activeImageIndex, setActiveImageIndex] =
    useState(0)

  const [openCardId, setOpenCardId] =
    useState(null)

  const [openImageIndex, setOpenImageIndex] =
    useState(null)

  const [barSelection, setBarSelection] =
    useState(null)

  const [selectionStatus, setSelectionStatus] =
    useState('loading')

  const [remoteGallery, setRemoteGallery] =
    useState(null)

  useEffect(() => {
    let isCancelled = false

    async function loadBarSelection() {
      setSelectionStatus('loading')

      try {
        const selection =
          await getBarSelection(
            i18n.resolvedLanguage
          )

        if (!isCancelled) {
          setBarSelection(selection)
          setSelectionStatus('success')
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(
            'No se pudo cargar la selección de barra:',
            error
          )

          setBarSelection(null)
          setSelectionStatus('error')
        }
      }
    }

    loadBarSelection()

    return () => {
      isCancelled = true
    }
  }, [i18n.resolvedLanguage])

  useEffect(() => {
    let isCancelled = false

    async function loadBarGallery() {
      try {
        const gallery =
          await getBarGallery(
            i18n.resolvedLanguage
          )

        if (!isCancelled) {
          setRemoteGallery(gallery)
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(
            'No se pudo cargar la galería desde Sanity:',
            error
          )

          setRemoteGallery(null)
        }
      }
    }

    loadBarGallery()

    return () => {
      isCancelled = true
    }
  }, [i18n.resolvedLanguage])

  const displayCards = useMemo(() => {
    if (!remoteGallery) {
      return barCards
    }

    return barCards.flatMap(
      (localCard) => {
        const remoteCard =
          remoteGallery.cards.find(
            (card) =>
              card.cardId === localCard.id
          )

        if (!remoteCard) {
          return [localCard]
        }

        if (
          remoteCard.isVisible === false
        ) {
          return []
        }

        const remoteImages =
          (remoteCard.images ?? [])
            .filter(
              (image) =>
                image?.desktop
            )
            .map((image) => ({
              desktop:
                image.desktop,
              mobile:
                image.mobile ||
                image.desktop,
              alt:
                image.alt?.trim() ??
                '',
            }))

        return [
          {
            ...localCard,
            images:
              remoteImages.length > 0
                ? remoteImages
                : localCard.images,
          },
        ]
      }
    )
  }, [remoteGallery])

  const maximumImageCount = useMemo(
    () =>
      Math.max(
        1,
        ...displayCards.map(
          (card) =>
            card.images.length
        )
      ),
    [displayCards]
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImageIndex(
        (currentIndex) =>
          (currentIndex + 1) %
          maximumImageCount
      )
    }, 3000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [maximumImageCount])

  useEffect(() => {
    if (!openCardId) {
      return undefined
    }

    function closePopover() {
      setOpenCardId(null)
      setOpenImageIndex(null)
    }

    function handlePointerDown(event) {
      const openCard =
        openCardContainerRef.current

      if (
        openCard &&
        !openCard.contains(event.target)
      ) {
        closePopover()
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closePopover()
      }
    }

    document.addEventListener(
      'pointerdown',
      handlePointerDown
    )

    document.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlePointerDown
      )

      document.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [openCardId])

  function toggleCard(
    cardId,
    cardIndex,
    imageCount
  ) {
    if (openCardId === cardId) {
      setOpenCardId(null)
      setOpenImageIndex(null)
      return
    }

    const currentCardImage =
      (activeImageIndex + cardIndex) %
      imageCount

    setOpenImageIndex(currentCardImage)
    setOpenCardId(cardId)
  }

  return (
    <section className="bg-[#18130f] pt-4 md:pt-6">
      <div
        id="barra"
        className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-8 md:scroll-mt-24 md:pb-10"
      >
        <p className="section-eyebrow">
          {t('bar.eyebrow')}
        </p>

        <h2 className="section-title mt-6 max-w-5xl whitespace-pre-line">
          {t('bar.title')}
        </h2>

        <p className="section-text mt-7 max-w-2xl">
          {t('bar.description')}
        </p>
      </div>

      <div className="relative grid lg:grid-cols-3">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-24 bg-linear-to-b from-[#18130f] to-transparent md:h-28" />

        {displayCards.map((card, cardIndex) => {
          const translationKey =
            cardTranslationKeys[card.id]

          const isOpen =
            openCardId === card.id

          const cyclingImageIndex =
            (activeImageIndex + cardIndex) %
            card.images.length

          const cardActiveIndex =
            isOpen &&
              openImageIndex !== null
              ? openImageIndex
              : cyclingImageIndex

          return (
            <article
              key={card.id}
              ref={
                isOpen
                  ? openCardContainerRef
                  : null
              }
              className="group relative min-h-108 overflow-hidden bg-[#211b16] sm:min-h-116 lg:min-h-124"
            >
              {card.images.map(
                (image, imageIndex) => {
                  const isActive =
                    imageIndex ===
                    cardActiveIndex

                  return (
                    <picture
                      key={image.desktop}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 z-0 block transition-all duration-1000 ease-in-out ${isActive
                          ? 'scale-100 opacity-70 group-hover:scale-[1.025] group-hover:opacity-85'
                          : 'scale-[1.015] opacity-0'
                        }`}
                    >
                      <source
                        media="(max-width: 767px)"
                        srcSet={image.mobile}
                      />

                      <img
                        src={image.desktop}
                        alt={
                          isActive
                            ? image.alt ||
                            t(
                              `bar.cards.${translationKey}.imageAlt`
                            )
                            : ''
                        }
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                        className="h-full w-full object-cover object-center"
                      />
                    </picture>
                  )
                }
              )}

              <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/50 to-black/5" />

              <SelectionPopover
                cardId={card.id}
                translationKey={translationKey}
                selection={barSelection}
                status={selectionStatus}
                isOpen={isOpen}
              />

              <div className="relative z-20 flex min-h-108 flex-col justify-end p-7 sm:min-h-116 sm:p-8 lg:min-h-124 lg:p-9">
                <h3 className="card-title text-[#f5efe6] [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]">
                  {t(
                    `bar.cards.${translationKey}.title`
                  )}
                </h3>

                <p className="card-text mt-4 max-w-md text-[#e2d7c8]! opacity-100! [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
                  {t(
                    `bar.cards.${translationKey}.description`
                  )}
                </p>

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={
                    `selection-${card.id}`
                  }
                  onClick={() =>
                    toggleCard(
                      card.id,
                      cardIndex,
                      card.images.length
                    )
                  }
                  className="relative z-50 mt-7 inline-flex w-fit cursor-pointer items-center gap-3 border-b border-[#c89b5c]/60 pb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#f5efe6] transition hover:border-[#c89b5c] hover:text-[#c89b5c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c89b5c]"
                >
                  <span>
                    {isOpen
                      ? t(
                        'bar.selection.hide'
                      )
                      : t(
                        'bar.selection.show'
                      )}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-xl font-light leading-none text-[#c89b5c]"
                  >
                    {isOpen ? '-' : '+'}
                  </span>
                </button>
              </div>
            </article>
          )
        })}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-28 bg-linear-to-t from-[#18130f] to-transparent md:h-32" />
      </div>
    </section>
  )
}

export default Gallery