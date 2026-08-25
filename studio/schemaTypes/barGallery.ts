import {defineArrayMember, defineField, defineType} from 'sanity'

export const barGallery = defineType({
  name: 'barGallery',
  title: 'Fotografías de En la barra',
  type: 'document',

  fields: [
    defineField({
      name: 'internalName',
      title: 'Nombre interno',
      type: 'string',
      initialValue: 'Galería de En la barra',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'cards',
      title: 'Bloques de fotografías',
      description:
        'Añade los bloques La barra, Producto y Bodega. Dentro de cada uno podrás ordenar sus fotografías.',
      type: 'array',

      of: [
        defineArrayMember({
          type: 'barGalleryCard',
        }),
      ],

      validation: (Rule) =>
        Rule.max(3).custom((cards) => {
          if (!cards) {
            return true
          }

          const ids = (
            cards as Array<{
              cardId?: string
            }>
          )
            .map((card) => card.cardId)
            .filter((cardId): cardId is string => Boolean(cardId))

          const uniqueIds = new Set(ids)

          if (uniqueIds.size !== ids.length) {
            return 'No puede haber dos bloques de la misma sección.'
          }

          return true
        }),
    }),
  ],

  preview: {
    select: {
      title: 'internalName',
      cards: 'cards',
    },

    prepare({title, cards}) {
      const totalImages =
        cards?.reduce(
          (
            total: number,
            card: {
              images?: unknown[]
            },
          ) => total + (card?.images?.length ?? 0),
          0,
        ) ?? 0

      return {
        title: title || 'Galería de En la barra',
        subtitle: `${totalImages} fotografías`,
      }
    },
  },
})
