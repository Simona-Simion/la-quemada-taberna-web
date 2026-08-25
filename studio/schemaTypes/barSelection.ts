import {
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

export const barSelection = defineType({
  name: 'barSelection',
  title: 'Selección de barra',
  type: 'document',

  fields: [
    defineField({
      name: 'internalName',
      title: 'Nombre interno',
      type: 'string',
      initialValue:
        'Selección de Barra, Producto y Bodega',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'barItems',
      title: 'La barra',
      description:
        'Aperitivos y preparaciones que suelen encontrarse en la barra.',
      type: 'array',

      of: [
        defineArrayMember({
          type: 'barSelectionItem',
        }),
      ],
    }),

    defineField({
      name: 'productItems',
      title: 'Producto',
      description:
        'Productos, embutidos, quesos y propuestas de temporada.',
      type: 'array',

      of: [
        defineArrayMember({
          type: 'barSelectionItem',
        }),
      ],
    }),

    defineField({
      name: 'wineItems',
      title: 'Bodega',
      description:
        'Tipos de vino y bebidas disponibles o habituales.',
      type: 'array',

      of: [
        defineArrayMember({
          type: 'barSelectionItem',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'internalName',
      barItems: 'barItems',
      productItems: 'productItems',
      wineItems: 'wineItems',
    },

    prepare({
      title,
      barItems,
      productItems,
      wineItems,
    }) {
      const totalItems =
        (barItems?.length ?? 0) +
        (productItems?.length ?? 0) +
        (wineItems?.length ?? 0)

      return {
        title:
          title ||
          'Selección de barra',
        subtitle: `${totalItems} elementos`,
      }
    },
  },
})